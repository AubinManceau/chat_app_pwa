"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "@/types/chat";

interface SocketContextType {
    socket: Socket | null;
    currentRoom: string | null;
    joinRoom: (roomName: string, pseudo: string | null) => void;
    sendMessage: (message: string, pseudo?: string | null) => void;
    sendImageMessage: (imageData: string) => void;
    getMessages: (callback: (data: Message) => void) => void;
    setPendingMessageCallback: (callback: (message: Message) => void) => void;
    setMessageSentCallback: (callback: (tempId: string) => void) => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [currentRoom, setCurrentRoom] = useState<string | null>(null);
    const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
    const pendingMessageCallbackRef = useRef<((message: Message) => void) | undefined>(undefined);
    const messageSentCallbackRef = useRef<((tempId: string) => void) | undefined>(undefined);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Queue pour les messages offline
    const processOfflineQueue = (socketInstance: Socket, roomToProcess?: string) => {
        const queueStr = localStorage.getItem("offline_queue");
        const queue = JSON.parse(queueStr || "[]");
        if (queue.length === 0) return;

        // Si une room est spécifiée, on ne traite que les messages de cette room
        const targetRoom = roomToProcess || currentRoom;

        if (!targetRoom) return;

        console.log(`🌐 Traitement file d'attente pour la room : ${targetRoom}`);

        const messagesToSend = queue.filter((msg: any) => msg.roomName === targetRoom);
        const messagesToKeep = queue.filter((msg: any) => msg.roomName !== targetRoom);

        if (messagesToSend.length === 0) return;

        console.log(`🚀 Envoi de ${messagesToSend.length} messages pour ${targetRoom}...`);

        messagesToSend.forEach((msg: any) => {
            socketInstance.emit("chat-msg", {
                content: msg.content,
                roomName: msg.roomName,
            });

            // Notifier l'UI que le message a été envoyé
            if (msg.tempId && messageSentCallbackRef.current) {
                messageSentCallbackRef.current(msg.tempId);
            }
        });

        // On ne garde que les messages des AUTRES rooms
        localStorage.setItem("offline_queue", JSON.stringify(messagesToKeep));
    };

    useEffect(() => {
        const newSocket = io("https://api.tools.gavago.fr", {
            transports: ["websocket"],
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: Infinity
        });

        newSocket.on("connect", () => {
            console.log("🟢 Connecté au serveur Socket.IO");
            // Attendre un peu pour s'assurer que la connexion est stable
            setTimeout(() => {
                // Au connect, on essaie de vider la queue de la room courante (si elle est set)
                // Note : currentRoom peut être null au tout début, mais si on reco, le state React est là.
                if (currentRoom) {
                    processOfflineQueue(newSocket, currentRoom);
                }
            }, 500);
        });

        newSocket.on("disconnect", (reason) => {
            console.log("🔴 Déconnecté du serveur Socket.IO", reason);
        });

        newSocket.on("connect_error", (error) => {
            console.log("⚠️ Erreur de connexion Socket.IO", error);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const joinRoom = (roomName: string, pseudo: string | null) => {
        if (!socket) return;

        if (currentRoom === roomName) return;
        socket.off("chat-join-room");
        setCurrentRoom(null);

        socket.emit("chat-join-room", { pseudo, roomName });
        setCurrentRoom(roomName);

        // Vérifier s'il y a des messages en attente pour cette nouvelle room
        // On le fait immédiatement si le socket est connecté
        if (socket.connected) {
            console.log("Variante joinRoom : Vérification messages en attente...");
            processOfflineQueue(socket, roomName);
        }
    };

    const addToOfflineQueue = (content: string, room: string, isImage: boolean = false) => {
        const tempId = `temp_${Date.now()}_${Math.random()}`;
        const queue = JSON.parse(localStorage.getItem("offline_queue") || "[]");

        queue.push({
            content,
            roomName: room,
            timestamp: Date.now(),
            tempId,
            isImage
        });

        localStorage.setItem("offline_queue", JSON.stringify(queue));

        // Notifier l'UI
        if (pendingMessageCallbackRef.current) {
            pendingMessageCallbackRef.current({
                content,
                pseudo: null,
                pending: true,
                tempId,
                imageData: isImage ? content : undefined,
                dateEmis: new Date().toISOString()
            });
        }
    };

    const sendMessage = (message: string) => {
        if (!currentRoom) return;

        // PRIORITÉ 1 : État Internet Immédiat
        if (!isOnline) {
            addToOfflineQueue(message, currentRoom);
            return;
        }

        // PRIORITÉ 2 : État du Socket
        const isSocketConnected = socket && socket.connected;

        if (isSocketConnected) {
            socket.timeout(5000).emit("chat-msg", {
                content: message,
                roomName: currentRoom,
            }, (err: any) => {
                if (err) {
                    addToOfflineQueue(message, currentRoom);
                }
            });
        } else {
            addToOfflineQueue(message, currentRoom);
        }
    };

    const sendImageMessage = (imageData: string) => {
        if (!currentRoom) return;

        if (!isOnline) {
            addToOfflineQueue(imageData, currentRoom, true);
            return;
        }

        const isConnected = socket && socket.connected;

        if (isConnected) {
            socket!.timeout(5000).emit("chat-msg", {
                content: imageData,
                roomName: currentRoom,
            }, (err: any) => {
                if (err) {
                    addToOfflineQueue(imageData, currentRoom, true);
                }
            });
        } else {
            addToOfflineQueue(imageData, currentRoom, true);
        }
    };

    const getMessages = (callback: (data: Message) => void) => {
        if (!socket) return;

        socket.off("chat-msg");
        socket.on("chat-msg", (data: Message) => {
            callback(data);
        });

    };


    return (
        <SocketContext.Provider value={{
            socket,
            currentRoom,
            joinRoom,
            sendMessage,
            sendImageMessage,
            getMessages,
            setPendingMessageCallback: (callback: (message: Message) => void) => {
                pendingMessageCallbackRef.current = callback;
            },
            setMessageSentCallback: (callback: (tempId: string) => void) => {
                messageSentCallbackRef.current = callback;
            }
        }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};
