"use client";

import { useState, useRef, useEffect } from "react";
import { useSocket } from "@/contexts/SocketContext";
import { useAuth } from "@/contexts/AuthContext";
import { sendImage, getImage } from "@/lib/api";
import { Message } from "@/types/chat";
import MessageBubble from "@/components/chat/MessageBubble";
import ImagePreview from "@/components/chat/ImagePreview";
import CameraView from "@/components/chat/CameraView";
import GalleryModal from "@/components/chat/GalleryModal";
import ImageViewer from "@/components/chat/ImageViewer";

export default function Chat() {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { pseudo } = useAuth();
    const socket = useSocket();

    const sendMessage = () => {
        if (message.trim() === "") return;
        socket.sendMessage(message);
        setMessage("");
    };

    useEffect(() => {
        setMessages([]);
    }, [socket.currentRoom]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!socket.socket) return;

        socket.getMessages(async (data: Message) => {
            if (data.pseudo === "SERVER") return;

            let isImageMessage = false;

            if (data.content.startsWith('[IMAGE]')) {
                const urlMatch = data.content.match(/https?:\/\/[^\s]+\/images\/([^\s]+)/);
                if (urlMatch && urlMatch[1]) {
                    const imageId = urlMatch[1];
                    const imageResponse = await getImage(imageId);

                    if (imageResponse.success && imageResponse.data_image) {
                        data.imageData = imageResponse.data_image;
                        data.imageId = imageId;
                        isImageMessage = true;
                    }
                }
            }

            setMessages((prev) => [...prev, data]);
        });
    }, [socket]);

    const sendPhoto = async () => {
        if (!photo || !socket.socket?.id) return;

        const result = await sendImage(socket.socket.id, photo);
        if (result.success) {
            socket.sendImageMessage(socket.socket.id, photo);
        }

        setPhoto(null);
    };

    const deletePhoto = () => {
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
            sendMessage();
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

    return (
        <div className="h-[calc(100vh-57px)] w-5/7 flex flex-col items-center justify-end px-12 py-4">
            {socket.currentRoom ? (
                <>
                    <div className="w-full flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-1 mb-4">
                        {messages.map((msg, index) => (
                            <MessageBubble
                                key={index}
                                message={msg}
                                isOwnMessage={msg.pseudo === pseudo}
                                onImageClick={setSelectedImage}
                            />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="w-full mb-4">
                        {photo && (
                            <ImagePreview imageData={photo} onDelete={deletePhoto} />
                        )}

                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendClick()}
                                placeholder="Message ..."
                                disabled={!!photo}
                                className="border rounded-full pl-3 pr-32 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                            <button
                                onClick={handleSendClick}
                                className="absolute right-28 text-purple-600 font-bold cursor-pointer"
                            >
                                ➤
                            </button>
                            <button
                                onClick={() => setGalleryOpen(true)}
                                className="px-2 text-purple-600 text-2xl absolute top-1/2 transform -translate-y-1/2 right-14 cursor-pointer"
                                title="Galerie"
                            >
                                🖼️
                            </button>
                            <button
                                onClick={handleCameraButtonClick}
                                className="px-2 text-purple-600 text-4xl absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer"
                                title="Caméra"
                            >
                                +
                            </button>
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
        </div>
    );
}