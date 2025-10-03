"use client";

import { useEffect, useState } from "react";

export default function Gallery() {
    const [photos, setPhotos] = useState<string[]>([]);

    useEffect(() => {
        const storedPhotos = JSON.parse(localStorage.getItem("photos") || "[]");
        setPhotos(storedPhotos);
    }, []);

    return (
        <div className="h-full w-full p-4">
            {photos.length === 0 ? (
                <p className="h-full flex justify-center items-center">
                    Aucune photo enregistrée
                </p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                        <div key={index} className="relative">
                            <img
                                src={photo}
                                alt={`photo-${index}`}
                                className="rounded-lg shadow-md w-full h-auto object-cover"
                            />
                            <button
                                onClick={() => {
                                    const updatedPhotos = photos.filter((_, i) => i !== index);
                                    setPhotos(updatedPhotos);
                                    localStorage.setItem("photos", JSON.stringify(updatedPhotos));
                                }}
                                className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center absolute top-2 right-2 shadow-lg"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}