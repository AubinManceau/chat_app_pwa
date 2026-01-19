"use client";

import { useState, useRef, useEffect } from "react";
import { useSocket } from "@/contexts/SocketContext";
import { useAuth } from "@/contexts/AuthContext";
import { sendImage, getImage } from "@/lib/api";

interface Message {
    content: string;
    pseudo: string | null;
    dateEmis?: string | null;
    imageId?: string;
    imageData?: string;
}

export default function Chat() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);
    const { pseudo } = useAuth();
    const socket = useSocket();

    const sendMessage = () => {
        if (message.trim() === "") return;
        socket.sendMessage(message);
        setMessage("");
    };

    // Vide les messages quand on change de room
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
        if (cameraOpen) {
            async function initCamera() {
                try {
                    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                    if (videoRef.current) {
                        videoRef.current.srcObject = mediaStream;
                    }
                    setStream(mediaStream);
                } catch (err) {
                    console.error("Erreur accès caméra:", err);
                }
            }

            initCamera();
        } else {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
                setStream(null);
            }
        }
    }, [cameraOpen]);

    useEffect(() => {
        if (!socket) return;

        socket.getMessages(async (data: Message) => {
            if (data.pseudo === "SERVER") return;

            let isImageMessage = false;

            // Vérifier si c'est le format du serveur: [IMAGE] URL
            if (data.content.startsWith('[IMAGE]')) {
                const urlMatch = data.content.match(/https?:\/\/[^\s]+\/images\/([^\s]+)/);
                if (urlMatch && urlMatch[1]) {
                    const imageId = urlMatch[1];
                    console.log("📨 Message image reçu:", { pseudo: data.pseudo, imageId });

                    const imageResponse = await getImage(imageId);

                    if (imageResponse.success && imageResponse.data_image) {
                        data.imageData = imageResponse.data_image;
                        data.imageId = imageId;
                        isImageMessage = true;
                        console.log("✅ Image récupérée, taille:", imageResponse.data_image.length);
                    } else {
                        console.error("❌ Échec récupération image:", imageResponse.message || imageResponse.error);
                    }
                }
            }

            // Si ce n'est pas une image, c'est un message texte
            if (!isImageMessage) {
                console.log("📨 Message texte:", { pseudo: data.pseudo, content: data.content.substring(0, 50) });
            }

            setMessages((prev) => [...prev, data]);
        });
    }, [socket]);

    const takePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext("2d");
        if (!context) return;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Compresser l'image en JPEG avec qualité réduite pour éviter l'erreur 413
        const newPhoto = canvas.toDataURL("image/jpeg", 0.7); // 70% de qualité
        setPhoto(newPhoto);
        setCameraOpen(false);

        // Sauvegarder la photo dans la galerie locale
        const storedPhotos = JSON.parse(localStorage.getItem("photos") || "[]");
        storedPhotos.push(newPhoto);
        localStorage.setItem("photos", JSON.stringify(storedPhotos));
        console.log("📸 Photo sauvegardée dans la galerie:", storedPhotos.length, "photos");
    };

    const sendPhoto = async () => {
        if (!photo) return;

        // Envoyer l'image à l'API
        if (socket.socket?.id) {
            const result = await sendImage(socket.socket.id, photo);
            if (result.success) {
                // Envoyer le message avec l'ID de l'image ET les données
                socket.sendImageMessage(socket.socket.id, photo);
                console.log("📸 Image envoyée avec succès!");
            } else {
                console.error("Erreur lors de l'envoi de l'image:", result.error);
            }
        }

        // Réinitialiser la photo
        setPhoto(null);
    };

    const deletePhoto = () => {
        setPhoto(null);
    };

    const handleCameraButtonClick = () => {
        if (photo) {
            // Si une photo existe, la supprimer et ouvrir la caméra
            setPhoto(null);
        }
        setCameraOpen(true);
    };

    const handleSendClick = () => {
        if (photo) {
            // Si une photo existe, l'envoyer
            sendPhoto();
        } else if (message.trim() !== "") {
            // Sinon envoyer le message texte
            sendMessage();
        }
    };

    const openGallery = () => {
        const storedPhotos = JSON.parse(localStorage.getItem("photos") || "[]");
        console.log("📂 Nombre de photos dans localStorage:", storedPhotos.length);
        if (storedPhotos.length > 0) {
            console.log("📸 Première photo (100 premiers caractères):", storedPhotos[0].substring(0, 100));
        }
        // Inverser pour afficher les plus récentes en premier
        setGalleryPhotos(storedPhotos.reverse());
        setGalleryOpen(true);
    };

    const selectPhotoFromGallery = (photoData: string) => {
        setPhoto(photoData);
        setGalleryOpen(false);
    };

    return (
        <div className="h-[calc(100vh-57px)] w-5/7 flex flex-col items-center justify-end px-12 py-4">
            <canvas ref={canvasRef} style={{ display: "none" }} />

            {!cameraOpen && (
                <div className="w-full h-full flex flex-col">
                    <div className="w-full h-[calc(100vh-150px)] mb-4 overflow-y-auto overflow-x-hidden px-8">
                        {!socket?.currentRoom ? (
                            <div className="text-center text-gray-500 h-full flex justify-center items-center">
                                <p>Rejoignez une conversation pour commencer à discuter !</p>
                            </div>
                        ) : messages.length === 0 ? (
                            <p className="h-full text-gray-500 flex justify-center items-center">
                                Commencez à discuter ! Envoyez le premier message.
                            </p>
                        ) : (
                            messages.map((msg, index) => {
                                const date = new Date(msg.dateEmis ?? Date.now());
                                const now = new Date();
                                const isToday =
                                    date.getDate() === now.getDate() &&
                                    date.getMonth() === now.getMonth() &&
                                    date.getFullYear() === now.getFullYear();

                                const pad = (n: number) => n.toString().padStart(2, "0");
                                const hours = pad(date.getHours());
                                const minutes = pad(date.getMinutes());
                                const formattedDate = isToday
                                    ? `${hours}:${minutes}`
                                    : `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} - ${hours}:${minutes}`;

                                const isOwnMessage = msg.pseudo === pseudo;
                                const hasImage = msg.imageData || msg.imageId;

                                return (
                                    <div key={index} className={`w-full flex ${isOwnMessage ? 'justify-end' : 'justify-start'} items-center mb-2`}>
                                        <div className={`flex flex-col gap-1.5 px-3 py-1 rounded-lg w-fit max-w-[70%] ${isOwnMessage ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-800'
                                            }`}>
                                            <p className="text-[12px]">
                                                {msg.pseudo}{" "}
                                                <span className={`text-[10px] italic ${isOwnMessage ? 'text-white' : 'text-gray-500'
                                                    }`}>{formattedDate}</span>
                                            </p>
                                            {hasImage ? (
                                                <div
                                                    className="cursor-pointer rounded overflow-hidden"
                                                    onClick={() => setSelectedImage(msg.imageData || null)}
                                                >
                                                    <img
                                                        src={msg.imageData}
                                                        alt="Image partagée"
                                                        className="max-w-full h-auto rounded"
                                                        style={{ maxHeight: '200px' }}
                                                    />
                                                </div>
                                            ) : (
                                                <p>{msg.content}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {socket?.currentRoom && (
                        <div className="w-full mb-4">
                            {/* Prévisualisation de l'image au-dessus de l'input */}
                            {photo && (
                                <div className="mb-2 relative flex justify-end">
                                    <img
                                        src={photo}
                                        alt="Prévisualisation"
                                        className="rounded-lg shadow-lg max-h-40 object-contain"
                                    />
                                    <button
                                        onClick={deletePhoto}
                                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}

                            {/* Input de message */}
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
                                    onClick={openGallery}
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
                    )}
                </div>
            )}

            {cameraOpen && (
                <div className="fixed inset-0 w-full h-full bg-white z-50">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />

                    <div className="absolute bottom-8 w-full flex justify-center gap-8">
                        <button
                            onClick={takePhoto}
                            className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-gray-300"
                        >
                            📸
                        </button>
                        <button
                            onClick={() => setCameraOpen(false)}
                            className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de sélection de la galerie */}
            {galleryOpen && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={() => setGalleryOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">Galerie</h2>
                            <button
                                onClick={() => setGalleryOpen(false)}
                                className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {galleryPhotos.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">Aucune photo dans la galerie</p>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {galleryPhotos.map((photoData, index) => (
                                    <div
                                        key={index}
                                        className="relative cursor-pointer group"
                                        onClick={() => selectPhotoFromGallery(photoData)}
                                    >
                                        <img
                                            src={photoData}
                                            alt={`Photo ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Modal pour afficher l'image en grand */}
            {selectedImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh] p-4">
                        <img
                            src={selectedImage}
                            alt="Image agrandie"
                            className="max-w-full max-h-full object-contain rounded-lg"
                        />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}