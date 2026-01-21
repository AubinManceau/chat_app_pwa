"use client";

import { useState, useCallback, useMemo } from "react";
import { Message } from "@/types/chat";
import { isImageData, extractImageIdFromUrl } from "@/utils/validators";

export const useMessageHandling = (
    currentRoom: string | null,
    pseudo: string | null,
    getPendingMessages: (roomId: string) => any[],
    onMessageReceived?: (message: Message) => void
) => {
    const [messages, setMessages] = useState<Message[]>([]);

    const processIncomingMessage = useCallback((data: Message) => {
        if (data.pseudo === "SERVER") return;

        if (!data.imageData && isImageData(data.content)) {
            data.imageData = data.content;
        }

        if (data.imageData) {

        } else if (data.content && data.content.includes('/images/')) {
            const imageId = extractImageIdFromUrl(data.content);
            if (imageId) {
                data.imageId = imageId;
            }
        }

        const receivedMessage: Message = {
            ...data,
            status: 'sent'
        };

        setMessages((prev) => {
            const filtered = prev.filter(m =>
                !(m.status === 'pending' && m.content === data.content && m.pseudo === data.pseudo)
            );
            return [...filtered, receivedMessage];
        });

        if (onMessageReceived && data.pseudo !== pseudo) {
            onMessageReceived(receivedMessage);
        }

        return receivedMessage;
    }, [pseudo, onMessageReceived]);

    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    const displayMessages = useMemo(() => {
        if (!currentRoom) return messages;

        const pendingMessages = getPendingMessages(currentRoom);
        const pendingAsMessages: Message[] = pendingMessages.map(pm => ({
            id: pm.id,
            content: pm.content,
            imageData: pm.imageData,
            pseudo: pseudo,
            status: pm.status,
            localTimestamp: pm.timestamp,
            dateEmis: new Date(pm.timestamp).toISOString()
        }));

        const combined = [...messages, ...pendingMessages];
        return combined.sort((a, b) => {
            const timeA = a.localTimestamp || new Date(a.dateEmis || 0).getTime();
            const timeB = b.localTimestamp || new Date(b.dateEmis || 0).getTime();
            return timeA - timeB;
        });
    }, [messages, currentRoom, getPendingMessages, pseudo]);

    return {
        messages,
        displayMessages,
        processIncomingMessage,
        clearMessages,
    };
};
