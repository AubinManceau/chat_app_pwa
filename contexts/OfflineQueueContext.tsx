"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useSocket } from "./SocketContext";

export interface PendingMessage {
    id: string;
    roomId: string;
    content: string;
    imageData?: string;
    timestamp: number;
    status: 'pending' | 'sending' | 'failed';
    retryCount: number;
}

interface OfflineQueueContextType {
    isOnline: boolean; // Network state (navigator.onLine)
    isConnected: boolean; // Combined: network + socket connection
    queueMessage: (roomId: string, content: string, imageData?: string) => PendingMessage;
    getPendingMessages: (roomId: string) => PendingMessage[];
    flushRoomQueue: (roomId: string) => Promise<void>;
    removeMessage: (messageId: string) => void;
    updateMessageStatus: (messageId: string, status: PendingMessage['status']) => void;
    getAllPendingMessages: () => PendingMessage[];
}

const OfflineQueueContext = createContext<OfflineQueueContextType | null>(null);

export const OfflineQueueProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOnline, setIsOnline] = useState(true);
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const [messageQueue, setMessageQueue] = useState<Map<string, PendingMessage[]>>(new Map());
    const { socket, currentRoom, sendMessage: socketSendMessage, sendImageMessage: socketSendImageMessage } = useSocket();
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const flushingRoomsRef = useRef<Set<string>>(new Set()); // Track rooms being flushed

    // Combined connection state: both network AND socket must be connected
    const isConnected = isOnline && isSocketConnected;

    // Track socket connection state with periodic checks
    useEffect(() => {
        if (!socket) {
            setIsSocketConnected(false);
            return;
        }

        const handleConnect = () => setIsSocketConnected(true);
        const handleDisconnect = () => setIsSocketConnected(false);

        // Set initial state
        setIsSocketConnected(socket.connected);

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);

        // Heartbeat: check connection every 2 seconds
        const heartbeatInterval = setInterval(() => {
            const currentlyConnected = socket.connected;
            setIsSocketConnected(currentlyConnected);
        }, 500);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            clearInterval(heartbeatInterval);
        };
    }, [socket]);

    // Network state detection with debouncing
    useEffect(() => {
        const updateOnlineStatus = () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }

            debounceTimerRef.current = setTimeout(() => {
                const online = navigator.onLine;
                setIsOnline(online);
            }, 300);
        };

        // Initial state
        setIsOnline(navigator.onLine);

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    // Generate unique ID for messages
    const generateMessageId = () => {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    };

    // Queue a message
    const queueMessage = useCallback((roomId: string, content: string, imageData?: string): PendingMessage => {
        const pendingMessage: PendingMessage = {
            id: generateMessageId(),
            roomId,
            content,
            imageData,
            timestamp: Date.now(),
            status: 'pending',
            retryCount: 0
        };

        setMessageQueue(prev => {
            const newQueue = new Map(prev);
            const roomMessages = newQueue.get(roomId) || [];
            newQueue.set(roomId, [...roomMessages, pendingMessage]);
            return newQueue;
        });

        return pendingMessage;
    }, []);

    // Get pending messages for a specific room
    const getPendingMessages = useCallback((roomId: string): PendingMessage[] => {
        return messageQueue.get(roomId) || [];
    }, [messageQueue]);

    // Get all pending messages across all rooms
    const getAllPendingMessages = useCallback((): PendingMessage[] => {
        const allMessages: PendingMessage[] = [];
        messageQueue.forEach(messages => {
            allMessages.push(...messages);
        });
        return allMessages;
    }, [messageQueue]);

    // Update message status
    const updateMessageStatus = useCallback((messageId: string, status: PendingMessage['status']) => {
        setMessageQueue(prev => {
            const newQueue = new Map(prev);
            let updated = false;

            newQueue.forEach((messages, roomId) => {
                const messageIndex = messages.findIndex(m => m.id === messageId);
                if (messageIndex !== -1) {
                    const updatedMessages = [...messages];
                    updatedMessages[messageIndex] = {
                        ...updatedMessages[messageIndex],
                        status
                    };
                    newQueue.set(roomId, updatedMessages);
                    updated = true;
                }
            });

            return updated ? newQueue : prev;
        });
    }, []);

    // Remove message from queue
    const removeMessage = useCallback((messageId: string) => {
        setMessageQueue(prev => {
            const newQueue = new Map(prev);
            let updated = false;

            newQueue.forEach((messages, roomId) => {
                const filteredMessages = messages.filter(m => m.id !== messageId);
                if (filteredMessages.length !== messages.length) {
                    if (filteredMessages.length === 0) {
                        newQueue.delete(roomId);
                    } else {
                        newQueue.set(roomId, filteredMessages);
                    }
                    updated = true;
                }
            });

            return updated ? newQueue : prev;
        });
    }, []);

    // Flush queue for a specific room
    const flushRoomQueue = useCallback(async (roomId: string) => {
        // Check if already flushing this room
        if (flushingRoomsRef.current.has(roomId)) {
            return;
        }

        if (!socket || !isConnected) {
            return;
        }

        const pendingMessages = messageQueue.get(roomId);
        if (!pendingMessages || pendingMessages.length === 0) {
            return;
        }

        // Mark room as being flushed
        flushingRoomsRef.current.add(roomId);

        try {
            // Process messages sequentially
            for (const message of pendingMessages) {
                if (message.status === 'failed' && message.retryCount >= 3) {
                    continue;
                }

                try {
                    // Update status to sending
                    updateMessageStatus(message.id, 'sending');

                    // Send the message
                    if (message.imageData) {
                        socketSendImageMessage(message.imageData);
                    } else {
                        socketSendMessage(message.content);
                    }

                    // Wait a bit to ensure message is sent
                    await new Promise(resolve => setTimeout(resolve, 100));

                    // Remove from queue on success
                    removeMessage(message.id);

                } catch (error) {
                    console.error(`Failed to send message ${message.id}:`, error);

                    // Update retry count and status
                    setMessageQueue(prev => {
                        const newQueue = new Map(prev);
                        const roomMessages = newQueue.get(roomId);
                        if (roomMessages) {
                            const messageIndex = roomMessages.findIndex(m => m.id === message.id);
                            if (messageIndex !== -1) {
                                const updatedMessages = [...roomMessages];
                                updatedMessages[messageIndex] = {
                                    ...updatedMessages[messageIndex],
                                    status: 'failed',
                                    retryCount: updatedMessages[messageIndex].retryCount + 1
                                };
                                newQueue.set(roomId, updatedMessages);
                            }
                        }
                        return newQueue;
                    });
                }
            }
        } finally {
            // Always remove the lock when done
            flushingRoomsRef.current.delete(roomId);
        }
    }, [socket, isConnected, messageQueue, updateMessageStatus, removeMessage, socketSendMessage, socketSendImageMessage]);

    // Auto-flush when coming online and in a room
    useEffect(() => {
        if (isConnected && currentRoom && socket) {
            const timer = setTimeout(() => {
                flushRoomQueue(currentRoom);
            }, 500); // Small delay to ensure socket is fully ready

            return () => clearTimeout(timer);
        }
    }, [isConnected, currentRoom, socket, flushRoomQueue]);

    return (
        <OfflineQueueContext.Provider value={{
            isOnline,
            isConnected,
            queueMessage,
            getPendingMessages,
            flushRoomQueue,
            removeMessage,
            updateMessageStatus,
            getAllPendingMessages
        }}>
            {children}
        </OfflineQueueContext.Provider>
    );
};

export const useOfflineQueue = () => {
    const context = useContext(OfflineQueueContext);
    if (!context) {
        throw new Error("useOfflineQueue must be used within an OfflineQueueProvider");
    }
    return context;
};
