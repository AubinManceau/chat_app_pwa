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

    useEffect(() => {
        const newSocket = io("https://api.tools.gavago.fr", {
            transports: ["websocket"],
            autoConnect: true,
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
        if (!socket || !currentRoom) {
            return;
        }

        socket.emit("chat-msg", {
            content: message,
            roomName: currentRoom,
        });
    };

    const sendImageMessage = (imageData: string) => {
        if (!socket || !currentRoom) {
            return;
        }

        socket.emit("chat-msg", {
            content: imageData,
            roomName: currentRoom,
        });
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
