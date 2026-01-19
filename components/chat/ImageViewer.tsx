"use client";

import { ImageViewerProps } from "@/types/chat";

export default function ImageViewer({ imageData, onClose }: ImageViewerProps) {
    if (!imageData) return null;

    return (
        <div
            className="bg-black/70 fixed inset-0 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div className="relative max-w-4xl max-h-[90vh] p-4">
                <img
                    src={imageData}
                    alt="Image agrandie"
                    className="max-w-full max-h-full object-contain rounded-lg"
                />
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
