"use client";

import { useState, useRef, useEffect } from "react";

export default function Chat() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        if (cameraOpen) {
            async function initCamera() {
                try {
                    const mediaStream = await navigator.mediaDevices.getUserMedia({video: true});
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
        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext("2d");
        if (!context) return;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        setPhoto(canvas.toDataURL("image/png"));
        setCameraOpen(false);
    };

    return (
        <div className="h-full w-5/7 flex flex-col items-center justify-end p-4">
            <canvas ref={canvasRef} style={{display: "none"}}/>

            {!cameraOpen && photo && (
                <div className="mb-8 relative">
                    <img src={photo} alt="Captured" className="max-h-80 w-full object-contain" />
                    <button
                        onClick={() => setPhoto(null)}
                        className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center absolute top-2 right-2 shadow-lg"
                    >
                        X
                    </button>
                </div>
            )}

            {cameraOpen ? (
                <div className="absolute top-0 left-0 w-full h-full bg-white">
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
                            onClick={() => setCameraOpen(false)}
                            className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg"
                        >
                            X
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={!photo ? () => setCameraOpen(true) : () => {
                            setPhoto(null);
                            setCameraOpen(true);
                        }}
                        className="w-10 h-10 rounded-full bg-purple-600 text-white text-4xl shadow-lg"
                    >
                        +
                    </button>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Ton message..."
                            className="border rounded px-3 py-2 w-96 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow"
                        >
                            Envoyer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}