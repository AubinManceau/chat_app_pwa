"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useSocket } from "./SocketContext";
import { OFFLINE_QUEUE_CONFIG } from "@/utils/constants";
import { generateUniqueId } from "@/utils/formatters";

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
    isOnline: boolean;
    isConnected: boolean;
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
    const flushingRoomsRef = useRef<Set<string>>(new Set());

    const isConnected = isOnline && isSocketConnected;

    useEffect(() => {
        if (!socket) {
            setIsSocketConnected(false);
            return;
        }

        const handleConnect = () => setIsSocketConnected(true);
        const handleDisconnect = () => setIsSocketConnected(false);

        setIsSocketConnected(socket.connected);

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);

        const heartbeatInterval = setInterval(() => {
            const currentlyConnected = socket.connected;
            setIsSocketConnected(currentlyConnected);
        }, OFFLINE_QUEUE_CONFIG.heartbeatInterval);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            clearInterval(heartbeatInterval);
        };
    }, [socket]);

    useEffect(() => {
        const updateOnlineStatus = () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }

            debounceTimerRef.current = setTimeout(() => {
                const online = navigator.onLine;
                setIsOnline(online);
            }, OFFLINE_QUEUE_CONFIG.debounceTime);
        };

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

    const queueMessage = useCallback((roomId: string, content: string, imageData?: string): PendingMessage => {
        const pendingMessage: PendingMessage = {
            id: generateUniqueId(),
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

    const getPendingMessages = useCallback((roomId: string): PendingMessage[] => {
        return messageQueue.get(roomId) || [];
    }, [messageQueue]);

    const getAllPendingMessages = useCallback((): PendingMessage[] => {
        const allMessages: PendingMessage[] = [];
        messageQueue.forEach(messages => {
            allMessages.push(...messages);
        });
        return allMessages;
    }, [messageQueue]);

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

    const flushRoomQueue = useCallback(async (roomId: string) => {
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

        flushingRoomsRef.current.add(roomId);

        try {
            for (const message of pendingMessages) {
                if (message.status === 'failed' && message.retryCount >= OFFLINE_QUEUE_CONFIG.maxRetryCount) {
                    continue;
                }

                try {
                    updateMessageStatus(message.id, 'sending');

                    if (message.imageData) {
                        socketSendImageMessage(message.imageData);
                    } else {
                        socketSendMessage(message.content);
                    }

                    await new Promise(resolve => setTimeout(resolve, OFFLINE_QUEUE_CONFIG.sendDelay));

                    removeMessage(message.id);

                } catch (error) {
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
            flushingRoomsRef.current.delete(roomId);
        }
    }, [socket, isConnected, messageQueue, updateMessageStatus, removeMessage, socketSendMessage, socketSendImageMessage]);

    useEffect(() => {
        if (isConnected && currentRoom && socket) {
            const timer = setTimeout(() => {
                flushRoomQueue(currentRoom);
            }, OFFLINE_QUEUE_CONFIG.flushDelay);

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
