"use client";

import { MessageBubbleProps } from "@/types/chat";

export default function MessageBubble({ message, isOwnMessage, onImageClick }: MessageBubbleProps) {
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

    const hasImage = message.imageData || message.imageId;

    return (
        <div className={`w-full flex ${isOwnMessage ? 'justify-end' : 'justify-start'} items-center mb-2`}>
            <div className={`flex flex-col gap-1.5 px-3 py-1 rounded-lg w-fit max-w-[70%] ${isOwnMessage ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-800'
                }`}>
                <p className="text-[12px] break-words">
                    {message.pseudo}{" "}
                    <span className={`text-[10px] italic ${isOwnMessage ? 'text-white' : 'text-gray-500'
                        }`}>{formattedDate}</span>
                </p>
                {hasImage ? (
                    <div
                        className="cursor-pointer rounded overflow-hidden"
                        onClick={() => message.imageData && onImageClick(message.imageData)}
                    >
                        <img
                            src={message.imageData}
                            alt="Image partagée"
                            className="max-w-full h-auto rounded"
                            style={{ maxHeight: '200px' }}
                        />
                    </div>
                ) : (
                    <p className="break-words overflow-hidden text-ellipsis">{message.content}</p>
                )}
            </div>
        </div>
    );
}
