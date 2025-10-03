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

        const newPhoto = canvas.toDataURL("image/png");
        setPhoto(newPhoto);
        setCameraOpen(false);

        const storedPhotos = JSON.parse(localStorage.getItem("photos") || "[]");
        storedPhotos.push(newPhoto);
        localStorage.setItem("photos", JSON.stringify(storedPhotos));

        console.log("📸 Photo sauvegardée:", storedPhotos);
    };

    return (
        <div className="h-full w-5/7 flex flex-col items-center justify-end px-12 py-4">
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
                <div className="w-full h-full flex flex-col">
                    <div className="w-full h-full mb-4 overflow-y-auto">

                    </div>
                    <div className="w-full mb-4 relative">
                        <input
                        type="text"
                        placeholder="Message ..."
                        className="border rounded-full pl-3 pr-20 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <button
                            onClick={!photo ? () => setCameraOpen(true) : () => {
                                setPhoto(null);
                                setCameraOpen(true);
                            }}
                            className="px-2 text-purple-600 text-4xl absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer"
                        >
                            +
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}