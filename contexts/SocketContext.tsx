"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "@/types/chat";

interface SocketContextType {
    socket: Socket | null;
    currentRoom: string | null;
    joinRoom: (roomName: string, pseudo: string | null) => void;
    sendMessage: (message: string, pseudo?: string | null) => void;
    sendImageMessage: (imageData: string) => void;
    getMessages: (callback: (data: Message) => void) => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [currentRoom, setCurrentRoom] = useState<string | null>(null);

    // Queue pour les messages offline
    const processOfflineQueue = (socketInstance: Socket) => {
        const queue = JSON.parse(localStorage.getItem("offline_queue") || "[]");
        if (queue.length === 0) return;

        console.log(`🌐 Connexion rétablie : Envoi de ${queue.length} messages en attente...`);

        queue.forEach((msg: any) => {
            // Pour simplifier, on envoie le message avec la roomName stockée.
            socketInstance.emit("chat-msg", {
                content: msg.content,
                roomName: msg.roomName,
            });
        });

        // Vider la queue
        localStorage.removeItem("offline_queue");
    };

    useEffect(() => {
        const newSocket = io("https://api.tools.gavago.fr", {
            transports: ["websocket"],
            autoConnect: true,
        });

        newSocket.on("connect", () => {
            console.log("🟢 Connecté au serveur Socket.IO");
            processOfflineQueue(newSocket);
        });

        newSocket.on("disconnect", () => {
            console.log("🔴 Déconnecté du serveur Socket.IO");
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
    };

    const sendMessage = (message: string) => {
        if (!currentRoom) return;

        if (socket && socket.connected) {
            socket.emit("chat-msg", {
                content: message,
                roomName: currentRoom,
            });
        } else {
            // Mode Offline : On stocke dans la queue
            console.log("🟠 Pas de connexion : Message mis en attente");
            const queue = JSON.parse(localStorage.getItem("offline_queue") || "[]");
            queue.push({
                content: message,
                roomName: currentRoom,
                timestamp: Date.now()
            });
            localStorage.setItem("offline_queue", JSON.stringify(queue));

            // On pourrait notifier l'UI ici (callback ?) si besoin
        }
    };

    const sendImageMessage = (imageData: string) => {
        if (!currentRoom) return;

        if (socket && socket.connected) {
            socket.emit("chat-msg", {
                content: imageData,
                roomName: currentRoom,
            });
        } else {
            // Mode Offline : Image mise en attente
            console.log("🟠 Pas de connexion : Image mise en attente");
            const queue = JSON.parse(localStorage.getItem("offline_queue") || "[]");
            queue.push({
                content: imageData,
                roomName: currentRoom,
                timestamp: Date.now()
            });
            localStorage.setItem("offline_queue", JSON.stringify(queue));
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
        <SocketContext.Provider value={{ socket, currentRoom, joinRoom, sendMessage, sendImageMessage, getMessages }}>
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
