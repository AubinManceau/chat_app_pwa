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

        socket.getMessages((data: Message) => {
            if (data.pseudo === "SERVER") return;

            // Nouveau : Données brutes (simplifié par l'utilisateur)
            if (!data.imageData && data.content.startsWith('data:image/')) {
                data.imageData = data.content;
            }


            // Si c'est une image, on extrait l'ID
            if (data.imageData) {
                // Pour les messages entrants, on n'a pas forcément l'ID de l'image
                // Il faudrait que le back renvoie l'ID s'il est stocké
                // Pour l'instant on suppose que le content contient l'URL si c'est un message système
            } else if (data.content && data.content.includes('/images/')) {
                // Tentative d'extraction d'ID depuis l'URL si présent dans le content
                const urlMatch = data.content.match(/https?:\/\/[^\s]+\/images\/([^\s]+)/);
                if (urlMatch && urlMatch[1]) {
                    data.imageId = urlMatch[1];
                }
            }

            setMessages((prev) => [...prev, data]);
        });
    }, [socket]);


    const sendPhoto = async () => {
        if (!photo || !socket.socket?.id) return;

        // 1. Envoyer l'image à l'API (Système 1 - Optionnel si souhaité)
        const result = await sendImage(socket.socket.id, photo);

        if (result.success) {
            console.log("📸 Image envoyée à l'API avec succès");
        } else {
            console.error("Erreur lors de l'envoi de l'image à l'API:", result.error);
        }

        // 2. Envoyer le message avec les données brutes (Nouveau système simplifié)
        socket.sendImageMessage(photo);
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

    const [showActionsMenu, setShowActionsMenu] = useState(false);

    // ... (rest of the component logic)

    return (
        <div className="h-[calc(100vh-57px)] w-5/7 flex flex-col items-center justify-end px-12 py-4" onClick={() => setShowActionsMenu(false)}>
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

                            {/* Bouton d'envoi */}
                            <button
                                onClick={handleSendClick}
                                className="absolute right-4 text-violet-600 hover:text-violet-800 transition-colors cursor-pointer p-1"
                                title="Envoyer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                                </svg>
                            </button>

                            {/* Bouton Actions (Plus) */}
                            <button
                                onClick={() => setShowActionsMenu(!showActionsMenu)}
                                className={`absolute right-12 text-gray-500 hover:text-violet-600 transition-colors cursor-pointer p-1 rounded-full ${showActionsMenu ? 'bg-gray-100 text-violet-600' : ''}`}
                                title="Plus d'actions"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
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
                                    <div className="h-px bg-gray-100 my-1"></div>
                                    <button
                                        onClick={async () => {
                                            setShowActionsMenu(false);
                                            try {
                                                if (!navigator.getBattery) {
                                                    alert("Cette fonctionnalité n'est pas supportée sur votre appareil (ex: iOS).");
                                                    return;
                                                }
                                                const battery = await navigator.getBattery();
                                                const level = Math.round(battery.level * 100);
                                                const icon = level > 20 ? '🔋' : '🪫';
                                                const charging = battery.charging ? '⚡' : '';
                                                socket.sendMessage(`${icon} J'ai ${level}% de batterie ${charging}`);
                                            } catch (e) {
                                                console.error(e);
                                                alert("Impossible d'accéder aux infos de batterie");
                                            }
                                        }}
                                        className="flex items-center gap-3 px-3 py-2 hover:bg-violet-50 rounded-md text-gray-700 transition-colors text-left"
                                    >
                                        <span className="text-xl">⚡</span>
                                        <span className="font-medium text-sm">Partager batterie</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowActionsMenu(false);
                                            if (!navigator.geolocation) {
                                                alert("La géolocalisation n'est pas supportée par votre navigateur.");
                                                return;
                                            }
                                            navigator.geolocation.getCurrentPosition(
                                                (position) => {
                                                    const { latitude, longitude } = position.coords;
                                                    const link = `https://www.google.com/maps?q=${latitude},${longitude}`;
                                                    socket.sendMessage(`📍 Ma position : ${link}`);
                                                },
                                                (error) => {
                                                    console.error("Erreur géolocalisation:", error);
                                                    alert("Impossible de récupérer votre position (autorisation refusée ?)");
                                                }
                                            );
                                        }}
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
        </div>
    );
}