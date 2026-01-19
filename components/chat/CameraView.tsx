"use client";

import { useRef, useEffect, useState } from "react";
import { CameraViewProps } from "@/types/chat";

export default function CameraView({ onPhotoTaken, onClose }: CameraViewProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        async function initCamera() {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
                setStream(mediaStream);
            } catch (err) {
                // Camera access denied or not available
            }
        }

        initCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const takePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext("2d");
        if (!context) return;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const photoData = canvas.toDataURL("image/jpeg", 0.7);

        // Sauvegarder dans la galerie locale
        const storedPhotos = JSON.parse(localStorage.getItem("photos") || "[]");
        storedPhotos.push(photoData);
        localStorage.setItem("photos", JSON.stringify(storedPhotos));

        onPhotoTaken(photoData);
    };

    const handleClose = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 w-full h-full bg-white z-50">
            <canvas ref={canvasRef} style={{ display: "none" }} />
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
                    onClick={handleClose}
                    className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg"
                >
                    X
                </button>
            </div>
        </div>
    );
}
