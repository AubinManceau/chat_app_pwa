"use client";

import { useEffect, useState } from "react";
import { MessageBubbleProps } from "@/types/chat";
import { getImage } from "@/lib/api";
import { formatMessageDate } from "@/utils/formatters";

export default function MessageBubble({ message, isOwnMessage, onImageClick, isPending, isFailed }: MessageBubbleProps) {
    const [imgData, setImgData] = useState<string | null>(message.imageData || null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (message.imageData) {
            setImgData(message.imageData);
        }
    }, [message.imageData]);

    useEffect(() => {
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
    }, [message.imageId, imgData]);

    const formattedDate = formatMessageDate(message.dateEmis);
    const hasImage = imgData || message.imageId;

    return (
        <div className={`w-full flex ${isOwnMessage ? 'justify-end' : 'justify-start'} items-center mb-2 ${isPending ? 'opacity-60' : ''}`}>
            <div className={`flex flex-col gap-1.5 px-3 py-1 rounded-lg w-fit max-w-[70%] ${isOwnMessage ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-800'
                } ${isFailed ? 'border-2 border-red-400' : ''}`}>
                <div className="flex items-center justify-between gap-2">
                    <p className="text-[12px] break-words">
                        {message.pseudo || message.userId || "Anonyme"}{" "}
                        <span className={`text-[10px] italic ${isOwnMessage ? 'text-white' : 'text-gray-500'}`}>
                            {formattedDate}
                        </span>
                    </p>
                    {isPending && (
                        <div className="flex items-center gap-1" title="En attente de connexion">
                            <svg className="w-3 h-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    )}
                    {isFailed && (
                        <div className="flex items-center gap-1" title="Échec de l'envoi">
                            <svg className="w-3 h-3 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                            </svg>
                        </div>
                    )}
                </div>
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
                {isPending && (
                    <p className={`text-[10px] italic mt-1 ${isOwnMessage ? 'text-white/70' : 'text-gray-500'}`}>
                        En attente d&apos;envoi...
                    </p>
                )}
                {isFailed && (
                    <p className="text-[10px] italic mt-1 text-red-500">
                        Échec de l&apos;envoi
                    </p>
                )}
            </div>
        </div>
    );
}
