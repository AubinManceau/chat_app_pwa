"use client";

import { useEffect, useState } from "react";
import ImageViewer from "@/components/chat/ImageViewer";

export default function Gallery() {
    const [photos, setPhotos] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const storedPhotos = JSON.parse(localStorage.getItem("photos") || "[]");
        setPhotos(storedPhotos);
    }, []);

    const handleDeletePhoto = (index: number) => {
        const updatedPhotos = photos.filter((_, i) => i !== index);
        setPhotos(updatedPhotos);
        localStorage.setItem("photos", JSON.stringify(updatedPhotos));
    };

    return (
        <div className="h-[calc(100vh-57px)] w-full p-4">
            {photos.length === 0 ? (
                <p className="h-full flex justify-center items-center">
                    Aucune photo enregistrée
                </p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={photo}
                                alt={`photo-${index}`}
                                onClick={() => setSelectedImage(photo)}
                                className="rounded-lg shadow-md w-full h-auto object-cover cursor-pointer hover:shadow-xl transition-shadow"
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeletePhoto(index);
                                }}
                                className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center absolute top-2 right-2 shadow-lg hover:bg-red-600 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <ImageViewer imageData={selectedImage} onClose={() => setSelectedImage(null)} />
        </div>
    );
}