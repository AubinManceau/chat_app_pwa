"use client";

import { ImagePreviewProps } from "@/types/chat";

export default function ImagePreview({ imageData, onDelete }: ImagePreviewProps) {
    return (
        <div className="mb-2 relative flex justify-end">
            <img
                src={imageData}
                alt="Prévisualisation"
                className="rounded-lg shadow-lg max-h-40 object-contain"
            />
            <button
                onClick={onDelete}
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
            >
                ✕
            </button>
        </div>
    );
}
