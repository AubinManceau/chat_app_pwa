"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);

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

    const takePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const context = canvasRef.current.getContext("2d");
        if (!context) return;

        context.drawImage(videoRef.current, 0, 0, 320, 240);
        setPhoto(canvasRef.current.toDataURL("image/png"));
        setCameraOpen(false);
    };

    return (
        <div className="h-screen w-screen flex flex-col justify-end items-center">
            {cameraOpen && (
                <div className="flex flex-col items-center">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        width="320"
                        height="240"
                        className="rounded-lg shadow-md"
                    />
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={takePhoto}
                            className="p-3 bg-blue-600 text-white rounded-full"
                        >
                            📸 Prendre une photo
                        </button>
                        <button
                            onClick={() => setCameraOpen(false)}
                            className="p-3 bg-red-600 text-white rounded-full"
                        >
                            ❌ Fermer
                        </button>
                    </div>
                </div>
            )}

            <canvas ref={canvasRef} width="320" height="240" style={{ display: "none" }} />

            {photo && (
                <div className="mt-4">
                    <img src={photo} alt="Captured" className="rounded-lg shadow-md" />
                </div>
            )}

            <div className="flex gap-2 items-center mt-4">
                <button
                    onClick={!photo ? () => setCameraOpen(true) : () => {    setPhoto(null); setCameraOpen(true)}}
                    className="p-3 bg-purple-600 text-4xl text-white rounded-full"
                >
                    +
                </button>
                <input type="text" className="border px-2 py-1 rounded" />
                <button type="submit" className="p-2 bg-green-600 text-white rounded">
                    Envoyer
                </button>
            </div>
        </div>
    );
}