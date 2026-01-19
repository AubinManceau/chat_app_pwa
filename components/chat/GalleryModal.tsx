"use client";

import { useEffect, useState } from "react";
import { GalleryModalProps } from "@/types/chat";

export default function GalleryModal({ isOpen, onClose, onSelectPhoto }: GalleryModalProps) {
    const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);

    useEffect(() => {
        if (isOpen) {
            const storedPhotos = JSON.parse(localStorage.getItem("photos") || "[]");
            setGalleryPhotos(storedPhotos.reverse());
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Galerie</h2>
                    <button
                        onClick={onClose}
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
                                onClick={() => onSelectPhoto(photoData)}
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
    );
}
