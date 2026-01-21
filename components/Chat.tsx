"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSocket } from "@/contexts/SocketContext";
import { useAuth } from "@/contexts/AuthContext";
import { useOfflineQueue } from "@/contexts/OfflineQueueContext";
import { useNotification } from "@/contexts/NotificationContext";
import { sendImage } from "@/lib/api";
import { useMessageHandling } from "@/hooks/useMessageHandling";
import { useFileHandling } from "@/hooks/useFileHandling";
import { getBatteryStatus, getCurrentPosition } from "@/utils/deviceFeatures";
import MessageBubble from "@/components/chat/MessageBubble";
import ImagePreview from "@/components/chat/ImagePreview";
import CameraView from "@/components/chat/CameraView";
import GalleryModal from "@/components/chat/GalleryModal";
import ImageViewer from "@/components/chat/ImageViewer";
import { Message } from "@/types/chat";

export default function Chat() {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showActionsMenu, setShowActionsMenu] = useState(false);

    const { pseudo } = useAuth();
    const socket = useSocket();
    const { isConnected, queueMessage, getPendingMessages, removeMessage } = useOfflineQueue();
    const { selectedFile: photo, handleFileSelect, clearFile: deletePhoto, setSelectedFile: setPhoto } = useFileHandling();
    const { permission, requestPermission, showNotification } = useNotification();

    const handleMessageReceived = useCallback((receivedMessage: Message) => {
        if (receivedMessage.pseudo !== pseudo) {
            const notificationBody = receivedMessage.imageData
                ? "📷 Photo"
                : receivedMessage.content;

            showNotification(`${receivedMessage.pseudo} dans ${socket.currentRoom}`, {
                body: notificationBody,
                tag: `chat-${socket.currentRoom}`,
                data: { room: socket.currentRoom }
            });
        }
    }, [pseudo, socket.currentRoom, showNotification]);

    const { displayMessages, processIncomingMessage, clearMessages } = useMessageHandling(
        socket.currentRoom,
        pseudo,
        getPendingMessages,
        handleMessageReceived
    );

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [displayMessages]);

    useEffect(() => {
        clearMessages();
    }, [socket.currentRoom, clearMessages]);

    useEffect(() => {
        if (socket.currentRoom && permission === "default") {
            requestPermission();
        }
    }, [socket.currentRoom, permission, requestPermission]);

    useEffect(() => {
        if (!socket.socket) return;

        socket.getMessages((data) => {
            const receivedMessage = processIncomingMessage(data);

            if (socket.currentRoom && receivedMessage) {
                const pendingMessages = getPendingMessages(socket.currentRoom);
                const matchingPending = pendingMessages.find(pm =>
                    pm.content === data.content && data.pseudo === pseudo
                );
                if (matchingPending) {
                    removeMessage(matchingPending.id);
                }
            }
        });
    }, [socket, processIncomingMessage, getPendingMessages, removeMessage, pseudo]);

    const sendTextMessage = () => {
        if (message.trim() === "" || !socket.currentRoom) return;

        if (isConnected && socket.socket) {
            socket.sendMessage(message);
        } else {
            queueMessage(socket.currentRoom, message);
        }

        setMessage("");
    };

    const sendPhoto = async () => {
        if (!photo || !socket.socket?.id || !socket.currentRoom) return;

        const result = await sendImage(socket.socket.id, photo);

        if (!result.success) {
            console.error("Erreur lors de l'envoi de l'image à l'API:", result.error);
        }

        if (isConnected && socket.socket) {
            socket.sendImageMessage(photo);
        } else {
            queueMessage(socket.currentRoom, photo, photo);
        }

        setPhoto(null);
    };

    const handleCameraButtonClick = () => {
        if (photo) {
            deletePhoto();
        }
        setCameraOpen(true);
    };

    const handleSendClick = () => {
        if (photo) {
            sendPhoto();
        } else if (message.trim() !== "") {
            sendTextMessage();
        }
    };

    const handlePhotoTaken = (photoData: string) => {
        setPhoto(photoData);
        setCameraOpen(false);
    };

    const handleSelectPhoto = (photoData: string) => {
        setPhoto(photoData);
        setGalleryOpen(false);
    };

    const handleBatteryShare = async () => {
        setShowActionsMenu(false);
        try {
            const batteryMessage = await getBatteryStatus();
            socket.sendMessage(batteryMessage);
        } catch (error) {
            alert((error as Error).message);
        }
    };

    const handleLocationShare = async () => {
        setShowActionsMenu(false);
        try {
            const locationMessage = await getCurrentPosition();
            socket.sendMessage(locationMessage);
        } catch (error) {
            alert((error as Error).message);
        }
    };

    return (
        <div className="h-[calc(100vh-57px)] w-5/7 flex flex-col items-center justify-end px-12 py-4" onClick={() => setShowActionsMenu(false)}>
            {socket.currentRoom ? (
                <>
                    <div className="w-full flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-1 mb-4">
                        {displayMessages.map((msg, index) => (
                            <MessageBubble
                                key={msg.id || index}
                                message={msg}
                                isOwnMessage={msg.pseudo === pseudo}
                                onImageClick={setSelectedImage}
                                isPending={msg.status === 'pending' || msg.status === 'sending'}
                                isFailed={msg.status === 'failed'}
                            />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="w-full mb-4">
                        {photo && (
                            <ImagePreview imageData={photo} onDelete={deletePhoto} />
                        )}

                        <div className="relative flex items-center" onClick={(e) => e.stopPropagation()}>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendClick()}
                                placeholder="Message ..."
                                disabled={!!photo}
                                className="border rounded-full pl-4 pr-16 py-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
                            />

                            <button
                                onClick={handleSendClick}
                                className="absolute right-4 text-violet-600 hover:text-violet-800 transition-colors cursor-pointer p-1"
                                title="Envoyer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                                </svg>
                            </button>

                            <button
                                onClick={() => setShowActionsMenu(!showActionsMenu)}
                                className={`absolute right-12 text-gray-500 hover:text-violet-600 transition-colors cursor-pointer p-1 rounded-full ${showActionsMenu ? 'bg-gray-100 text-violet-600' : ''}`}
                                title="Plus d'actions"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {showActionsMenu && (
                                <div className="absolute right-0 bottom-14 bg-white rounded-lg shadow-xl border border-gray-100 p-2 flex flex-col gap-1 min-w-[200px] z-10 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                    <button
                                        onClick={() => {
                                            handleCameraButtonClick();
                                            setShowActionsMenu(false);
                                        }}
                                        className="flex items-center gap-3 px-3 py-2 hover:bg-violet-50 rounded-md text-gray-700 transition-colors text-left"
                                    >
                                        <span className="text-xl">📸</span>
                                        <span className="font-medium text-sm">Prendre photo</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setGalleryOpen(true);
                                            setShowActionsMenu(false);
                                        }}
                                        className="flex items-center gap-3 px-3 py-2 hover:bg-violet-50 rounded-md text-gray-700 transition-colors text-left"
                                    >
                                        <span className="text-xl">🖼️</span>
                                        <span className="font-medium text-sm">Galerie</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            fileInputRef.current?.click();
                                            setShowActionsMenu(false);
                                        }}
                                        className="flex items-center gap-3 px-3 py-2 hover:bg-violet-50 rounded-md text-gray-700 transition-colors text-left"
                                    >
                                        <span className="text-xl">📁</span>
                                        <span className="font-medium text-sm">Téléverser fichier</span>
                                    </button>
                                    <div className="h-px bg-gray-100 my-1"></div>
                                    <button
                                        onClick={handleBatteryShare}
                                        className="flex items-center gap-3 px-3 py-2 hover:bg-violet-50 rounded-md text-gray-700 transition-colors text-left"
                                    >
                                        <span className="text-xl">⚡</span>
                                        <span className="font-medium text-sm">Partager batterie</span>
                                    </button>
                                    <button
                                        onClick={handleLocationShare}
                                        className="flex items-center gap-3 px-3 py-2 hover:bg-violet-50 rounded-md text-gray-700 transition-colors text-left"
                                    >
                                        <span className="text-xl">📍</span>
                                        <span className="font-medium text-sm">Partager position</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-gray-500">Sélectionnez une room pour commencer à discuter</p>
            )}

            {cameraOpen && (
                <CameraView onPhotoTaken={handlePhotoTaken} onClose={() => setCameraOpen(false)} />
            )}

            <GalleryModal
                isOpen={galleryOpen}
                onClose={() => setGalleryOpen(false)}
                onSelectPhoto={handleSelectPhoto}
            />

            <ImageViewer imageData={selectedImage} onClose={() => setSelectedImage(null)} />

            <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileSelect}
                className="hidden"
            />
        </div>
    );
}
