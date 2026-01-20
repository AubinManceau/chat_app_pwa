"use client";

import { useEffect, useState } from "react";
import { MessageBubbleProps } from "@/types/chat";
import { getImage } from "@/lib/api";

export default function MessageBubble({ message, isOwnMessage, onImageClick }: MessageBubbleProps) {
    const [imgData, setImgData] = useState<string | null>(message.imageData || null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Mettre à jour si les props changent
        if (message.imageData) {
            setImgData(message.imageData);
        }
    }, [message.imageData]);

    useEffect(() => {
        // Si on a un ID mais pas de données, on charge l'image
        if (message.imageId && !imgData && !loading) {
            const fetchImage = async () => {
                setLoading(true);
                const response = await getImage(message.imageId!);
                if (response.success && response.data_image) {
                    setImgData(response.data_image as string);
                }
                setLoading(false);
            };
            fetchImage();
        }
    }, [message.imageId, imgData]); // eslint-disable-line react-hooks/exhaustive-deps

    const date = new Date(message.dateEmis ?? Date.now());
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

    const hasImage = imgData || message.imageId;

    return (
        <div className={`w-full flex ${isOwnMessage ? 'justify-end' : 'justify-start'} items-center mb-2`}>
            <div className={`flex flex-col gap-1.5 px-3 py-1 rounded-lg w-fit max-w-[70%] ${message.pending
                ? (isOwnMessage ? 'bg-violet-300 text-white opacity-70 border-2 border-dashed border-violet-400' : 'bg-gray-300 text-gray-700 opacity-70 border-2 border-dashed border-gray-400')
                : (isOwnMessage ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-800')
                }`}>
                <p className="text-[12px] break-words">
                    {message.pending ? (
                        <span className="flex items-center gap-1">
                            <span>🔄</span>
                            <span>En attente d&apos;envoi</span>
                        </span>
                    ) : (
                        <>{message.pseudo || message.userId || "Anonyme"}</>
                    )}{" "}
                    <span className={`text-[10px] italic ${isOwnMessage ? 'text-white' : 'text-gray-500'
                        }`}>{formattedDate}</span>
                </p>
                {hasImage ? (
                    <div
                        className="cursor-pointer rounded overflow-hidden relative min-h-[50px] min-w-[50px] flex items-center justify-center bg-black/5"
                        onClick={() => imgData && onImageClick(imgData)}
                    >
                        {imgData ? (
                            <img
                                src={imgData}
                                alt="Image partagée"
                                className="max-w-full h-auto rounded"
                                style={{ maxHeight: '200px' }}
                            />
                        ) : (
                            <div className="p-4 flex flex-col items-center gap-2">
                                <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-xs opacity-70">Chargement...</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="break-words">
                        {message.content.split(/(https?:\/\/[^\s]+)/g).map((part, index) =>
                            part.match(/https?:\/\/[^\s]+/) ? (
                                <a
                                    key={index}
                                    href={part}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`underline cursor-pointer hover:opacity-80 break-all ${isOwnMessage ? 'text-white' : 'text-blue-600'}`}
                                >
                                    {part}
                                </a>
                            ) : (
                                part
                            )
                        )}
                    </p>
                )}
            </div>
        </div>
    );
}
