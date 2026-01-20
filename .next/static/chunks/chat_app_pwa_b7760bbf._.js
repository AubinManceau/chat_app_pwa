(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/chat_app_pwa/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchData",
    ()=>fetchData,
    "getImage",
    ()=>getImage,
    "sendImage",
    ()=>sendImage
]);
const API_BASE_URL = "https://api.tools.gavago.fr/socketio/api";
async function fetchData(endpoint) {
    try {
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        };
        const url = "".concat(API_BASE_URL).concat(endpoint);
        const res = await fetch(url, {
            headers
        });
        if (!res.ok) {
            throw new Error("Erreur HTTP! Statut: ".concat(res.status));
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return {
            error: error.message
        };
    }
}
async function sendImage(socketId, imageData) {
    try {
        const headers = {
            "Content-Type": "application/json"
        };
        // Utiliser le proxy local pour éviter les problèmes CORS
        const url = "/api/images";
        const res = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify({
                id: socketId,
                image_data: imageData
            })
        });
        if (!res.ok) {
            throw new Error("Erreur HTTP! Statut: ".concat(res.status));
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return {
            error: error.message
        };
    }
}
async function getImage(imageId) {
    try {
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        };
        // Utiliser le proxy local pour éviter les problèmes CORS
        const url = "/api/images?id=".concat(imageId);
        const res = await fetch(url, {
            headers
        });
        if (!res.ok) {
            throw new Error("Erreur HTTP! Statut: ".concat(res.status));
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return {
            error: error.message
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/chat_app_pwa/components/chat/MessageBubble.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MessageBubble
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function MessageBubble(param) {
    let { message, isOwnMessage, onImageClick } = param;
    _s();
    const [imgData, setImgData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(message.imageData || null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessageBubble.useEffect": ()=>{
            // Mettre à jour si les props changent
            if (message.imageData) {
                setImgData(message.imageData);
            }
        }
    }["MessageBubble.useEffect"], [
        message.imageData
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessageBubble.useEffect": ()=>{
            // Si on a un ID mais pas de données, on charge l'image
            if (message.imageId && !imgData && !loading) {
                const fetchImage = {
                    "MessageBubble.useEffect.fetchImage": async ()=>{
                        setLoading(true);
                        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImage"])(message.imageId);
                        if (response.success && response.data_image) {
                            setImgData(response.data_image);
                        }
                        setLoading(false);
                    }
                }["MessageBubble.useEffect.fetchImage"];
                fetchImage();
            }
        }
    }["MessageBubble.useEffect"], [
        message.imageId,
        imgData
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    var _message_dateEmis;
    const date = new Date((_message_dateEmis = message.dateEmis) !== null && _message_dateEmis !== void 0 ? _message_dateEmis : Date.now());
    const now = new Date();
    const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    const pad = (n)=>n.toString().padStart(2, "0");
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const formattedDate = isToday ? "".concat(hours, ":").concat(minutes) : "".concat(pad(date.getDate()), "/").concat(pad(date.getMonth() + 1), "/").concat(date.getFullYear(), " - ").concat(hours, ":").concat(minutes);
    const hasImage = imgData || message.imageId;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full flex ".concat(isOwnMessage ? 'justify-end' : 'justify-start', " items-center mb-2"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-1.5 px-3 py-1 rounded-lg w-fit max-w-[70%] ".concat(isOwnMessage ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-800'),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[12px] break-words",
                    children: [
                        message.pseudo || message.userId || "Anonyme",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] italic ".concat(isOwnMessage ? 'text-white' : 'text-gray-500'),
                            children: formattedDate
                        }, void 0, false, {
                            fileName: "[project]/chat_app_pwa/components/chat/MessageBubble.tsx",
                            lineNumber: 55,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/chat_app_pwa/components/chat/MessageBubble.tsx",
                    lineNumber: 53,
                    columnNumber: 17
                }, this),
                hasImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "cursor-pointer rounded overflow-hidden relative min-h-[50px] min-w-[50px] flex items-center justify-center bg-black/5",
                    onClick: ()=>imgData && onImageClick(imgData),
                    children: imgData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: imgData,
                        alt: "Image partagée",
                        className: "max-w-full h-auto rounded",
                        style: {
                            maxHeight: '200px'
                        }
                    }, void 0, false, {
                        fileName: "[project]/chat_app_pwa/components/chat/MessageBubble.tsx",
                        lineNumber: 64,
                        columnNumber: 29
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 flex flex-col items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/chat_app_pwa/components/chat/MessageBubble.tsx",
                                lineNumber: 72,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs opacity-70",
                                children: "Chargement..."
                            }, void 0, false, {
                                fileName: "[project]/chat_app_pwa/components/chat/MessageBubble.tsx",
                                lineNumber: 73,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/chat_app_pwa/components/chat/MessageBubble.tsx",
                        lineNumber: 71,
                        columnNumber: 29
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/chat_app_pwa/components/chat/MessageBubble.tsx",
                    lineNumber: 59,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "break-words",
                    children: message.content.split(/(https?:\/\/[^\s]+)/g).map((part, index)=>part.match(/https?:\/\/[^\s]+/) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: part,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "underline cursor-pointer hover:opacity-80 break-all ".concat(isOwnMessage ? 'text-white' : 'text-blue-600'),
                            children: part
                        }, index, false, {
                            fileName: "[project]/chat_app_pwa/components/chat/MessageBubble.tsx",
                            lineNumber: 81,
                            columnNumber: 33
                        }, this) : part)
                }, void 0, false, {
                    fileName: "[project]/chat_app_pwa/components/chat/MessageBubble.tsx",
                    lineNumber: 78,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/chat_app_pwa/components/chat/MessageBubble.tsx",
            lineNumber: 51,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/chat_app_pwa/components/chat/MessageBubble.tsx",
        lineNumber: 50,
        columnNumber: 9
    }, this);
}
_s(MessageBubble, "Yj9hHxDZyHlX977xWw4DT1LYXfs=");
_c = MessageBubble;
var _c;
__turbopack_context__.k.register(_c, "MessageBubble");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/chat_app_pwa/components/chat/ImagePreview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImagePreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function ImagePreview(param) {
    let { imageData, onDelete } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-2 relative flex justify-end",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: imageData,
                alt: "Prévisualisation",
                className: "rounded-lg shadow-lg max-h-40 object-contain"
            }, void 0, false, {
                fileName: "[project]/chat_app_pwa/components/chat/ImagePreview.tsx",
                lineNumber: 8,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onDelete,
                className: "absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors",
                children: "✕"
            }, void 0, false, {
                fileName: "[project]/chat_app_pwa/components/chat/ImagePreview.tsx",
                lineNumber: 13,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/chat_app_pwa/components/chat/ImagePreview.tsx",
        lineNumber: 7,
        columnNumber: 9
    }, this);
}
_c = ImagePreview;
var _c;
__turbopack_context__.k.register(_c, "ImagePreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/chat_app_pwa/components/chat/CameraView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CameraView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function CameraView(param) {
    let { onPhotoTaken, onClose } = param;
    _s();
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [stream, setStream] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CameraView.useEffect": ()=>{
            let isMounted = true;
            let localStream = null;
            async function initCamera() {
                try {
                    const mediaStream = await navigator.mediaDevices.getUserMedia({
                        video: true
                    });
                    // Si le composant a été démonté entre temps, on coupe tout de suite
                    if (!isMounted) {
                        mediaStream.getTracks().forEach({
                            "CameraView.useEffect.initCamera": (track)=>track.stop()
                        }["CameraView.useEffect.initCamera"]);
                        return;
                    }
                    localStream = mediaStream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = mediaStream;
                    }
                    setStream(mediaStream);
                } catch (err) {
                // Camera access denied or not available
                }
            }
            initCamera();
            return ({
                "CameraView.useEffect": ()=>{
                    isMounted = false;
                    // Nettoyage principal lors du démontage
                    if (localStream) {
                        localStream.getTracks().forEach({
                            "CameraView.useEffect": (track)=>track.stop()
                        }["CameraView.useEffect"]);
                    }
                    // Sécurité : Vérifier si le state stream contient quelque chose
                    if (stream) {
                        stream.getTracks().forEach({
                            "CameraView.useEffect": (track)=>track.stop()
                        }["CameraView.useEffect"]);
                    }
                }
            })["CameraView.useEffect"];
        }
    }["CameraView.useEffect"], []); // eslint-disable-line react-hooks/exhaustive-deps
    const takePhoto = ()=>{
        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        if (!context) return;
        // Appliquer l'effet miroir à la capture
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const photoData = canvas.toDataURL("image/jpeg", 0.7);
        // Sauvegarder dans la galerie locale
        const storedPhotos = JSON.parse(localStorage.getItem("photos") || "[]");
        storedPhotos.push(photoData);
        localStorage.setItem("photos", JSON.stringify(storedPhotos));
        onPhotoTaken(photoData);
    };
    const handleClose = ()=>{
        if (stream) {
            stream.getTracks().forEach((track)=>track.stop());
        }
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 w-full h-full bg-white z-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                style: {
                    display: "none"
                }
            }, void 0, false, {
                fileName: "[project]/chat_app_pwa/components/chat/CameraView.tsx",
                lineNumber: 86,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                ref: videoRef,
                autoPlay: true,
                playsInline: true,
                className: "absolute top-0 left-0 w-full h-full object-cover scale-x-[-1]"
            }, void 0, false, {
                fileName: "[project]/chat_app_pwa/components/chat/CameraView.tsx",
                lineNumber: 87,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-8 w-full flex justify-center gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: takePhoto,
                        className: "w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-gray-300",
                        children: "📸"
                    }, void 0, false, {
                        fileName: "[project]/chat_app_pwa/components/chat/CameraView.tsx",
                        lineNumber: 95,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleClose,
                        className: "w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg",
                        children: "X"
                    }, void 0, false, {
                        fileName: "[project]/chat_app_pwa/components/chat/CameraView.tsx",
                        lineNumber: 101,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/chat_app_pwa/components/chat/CameraView.tsx",
                lineNumber: 94,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/chat_app_pwa/components/chat/CameraView.tsx",
        lineNumber: 85,
        columnNumber: 9
    }, this);
}
_s(CameraView, "Qz6nfyfDqgSOmbUmDrJU8Y719UU=");
_c = CameraView;
var _c;
__turbopack_context__.k.register(_c, "CameraView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/chat_app_pwa/components/chat/GalleryModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GalleryModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function GalleryModal(param) {
    let { isOpen, onClose, onSelectPhoto } = param;
    _s();
    const [galleryPhotos, setGalleryPhotos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GalleryModal.useEffect": ()=>{
            if (isOpen) {
                const storedPhotos = JSON.parse(localStorage.getItem("photos") || "[]");
                setGalleryPhotos(storedPhotos.reverse());
            }
        }
    }["GalleryModal.useEffect"], [
        isOpen
    ]);
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-gray-800",
                            children: "Galerie"
                        }, void 0, false, {
                            fileName: "[project]/chat_app_pwa/components/chat/GalleryModal.tsx",
                            lineNumber: 28,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/chat_app_pwa/components/chat/GalleryModal.tsx",
                            lineNumber: 29,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/chat_app_pwa/components/chat/GalleryModal.tsx",
                    lineNumber: 27,
                    columnNumber: 17
                }, this),
                galleryPhotos.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 text-center py-8",
                    children: "Aucune photo dans la galerie"
                }, void 0, false, {
                    fileName: "[project]/chat_app_pwa/components/chat/GalleryModal.tsx",
                    lineNumber: 38,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
                    children: galleryPhotos.map((photoData, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative cursor-pointer group",
                            onClick: ()=>onSelectPhoto(photoData),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: photoData,
                                alt: "Photo ".concat(index + 1),
                                className: "w-full h-32 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow"
                            }, void 0, false, {
                                fileName: "[project]/chat_app_pwa/components/chat/GalleryModal.tsx",
                                lineNumber: 47,
                                columnNumber: 33
                            }, this)
                        }, index, false, {
                            fileName: "[project]/chat_app_pwa/components/chat/GalleryModal.tsx",
                            lineNumber: 42,
                            columnNumber: 29
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/chat_app_pwa/components/chat/GalleryModal.tsx",
                    lineNumber: 40,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/chat_app_pwa/components/chat/GalleryModal.tsx",
            lineNumber: 23,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/chat_app_pwa/components/chat/GalleryModal.tsx",
        lineNumber: 19,
        columnNumber: 9
    }, this);
}
_s(GalleryModal, "6V/u5Xxk9DBVUFcQFO9rPe4EaHw=");
_c = GalleryModal;
var _c;
__turbopack_context__.k.register(_c, "GalleryModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/chat_app_pwa/components/chat/ImageViewer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImageViewer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function ImageViewer(param) {
    let { imageData, onClose } = param;
    if (!imageData) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-black/70 fixed inset-0 flex items-center justify-center z-50",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative max-w-4xl max-h-[90vh] p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: imageData,
                    alt: "Image agrandie",
                    className: "max-w-full max-h-full object-contain rounded-lg"
                }, void 0, false, {
                    fileName: "[project]/chat_app_pwa/components/chat/ImageViewer.tsx",
                    lineNumber: 14,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "absolute top-6 right-6 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors",
                    children: "✕"
                }, void 0, false, {
                    fileName: "[project]/chat_app_pwa/components/chat/ImageViewer.tsx",
                    lineNumber: 19,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/chat_app_pwa/components/chat/ImageViewer.tsx",
            lineNumber: 13,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/chat_app_pwa/components/chat/ImageViewer.tsx",
        lineNumber: 9,
        columnNumber: 9
    }, this);
}
_c = ImageViewer;
var _c;
__turbopack_context__.k.register(_c, "ImageViewer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/chat_app_pwa/components/Chat.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Chat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$contexts$2f$SocketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/contexts/SocketContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$components$2f$chat$2f$MessageBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/components/chat/MessageBubble.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$components$2f$chat$2f$ImagePreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/components/chat/ImagePreview.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$components$2f$chat$2f$CameraView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/components/chat/CameraView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$components$2f$chat$2f$GalleryModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/components/chat/GalleryModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$components$2f$chat$2f$ImageViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/components/chat/ImageViewer.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
function Chat() {
    _s();
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [photo, setPhoto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [cameraOpen, setCameraOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [galleryOpen, setGalleryOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedImage, setSelectedImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { pseudo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$contexts$2f$SocketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"])();
    const sendMessage = ()=>{
        if (message.trim() === "") return;
        socket.sendMessage(message);
        setMessage("");
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Chat.useEffect": ()=>{
            setMessages([]);
        }
    }["Chat.useEffect"], [
        socket.currentRoom
    ]);
    const scrollToBottom = ()=>{
        var _messagesEndRef_current;
        (_messagesEndRef_current = messagesEndRef.current) === null || _messagesEndRef_current === void 0 ? void 0 : _messagesEndRef_current.scrollIntoView({
            behavior: "smooth"
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Chat.useEffect": ()=>{
            scrollToBottom();
        }
    }["Chat.useEffect"], [
        messages
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Chat.useEffect": ()=>{
            if (!socket.socket) return;
            socket.getMessages({
                "Chat.useEffect": (data)=>{
                    if (data.pseudo === "SERVER") return;
                    // Nouveau : Données brutes (simplifié par l'utilisateur)
                    if (!data.imageData && data.content.startsWith('data:image/')) {
                        data.imageData = data.content;
                    }
                    // Si c'est une image, on extrait l'ID
                    if (data.imageData) {
                    // Pour les messages entrants, on n'a pas forcément l'ID de l'image
                    // Il faudrait que le back renvoie l'ID s'il est stocké
                    // Pour l'instant on suppose que le content contient l'URL si c'est un message système
                    } else if (data.content && data.content.includes('/images/')) {
                        // Tentative d'extraction d'ID depuis l'URL si présent dans le content
                        const urlMatch = data.content.match(/https?:\/\/[^\s]+\/images\/([^\s]+)/);
                        if (urlMatch && urlMatch[1]) {
                            data.imageId = urlMatch[1];
                        }
                    }
                    setMessages({
                        "Chat.useEffect": (prev)=>[
                                ...prev,
                                data
                            ]
                    }["Chat.useEffect"]);
                }
            }["Chat.useEffect"]);
        }
    }["Chat.useEffect"], [
        socket
    ]);
    const sendPhoto = async ()=>{
        var _socket_socket;
        if (!photo || !((_socket_socket = socket.socket) === null || _socket_socket === void 0 ? void 0 : _socket_socket.id)) return;
        // 1. Envoyer l'image à l'API (Système 1 - Optionnel si souhaité)
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendImage"])(socket.socket.id, photo);
        if (result.success) {
            console.log("📸 Image envoyée à l'API avec succès");
        } else {
            console.error("Erreur lors de l'envoi de l'image à l'API:", result.error);
        }
        // 2. Envoyer le message avec les données brutes (Nouveau système simplifié)
        socket.sendImageMessage(photo);
        setPhoto(null);
    };
    const deletePhoto = ()=>{
        setPhoto(null);
    };
    const handleCameraButtonClick = ()=>{
        if (photo) {
            deletePhoto();
        }
        setCameraOpen(true);
    };
    const handleSendClick = ()=>{
        if (photo) {
            sendPhoto();
        } else if (message.trim() !== "") {
            sendMessage();
        }
    };
    const handlePhotoTaken = (photoData)=>{
        setPhoto(photoData);
        setCameraOpen(false);
    };
    const handleSelectPhoto = (photoData)=>{
        setPhoto(photoData);
        setGalleryOpen(false);
    };
    const [showActionsMenu, setShowActionsMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // ... (rest of the component logic)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-[calc(100vh-57px)] w-5/7 flex flex-col items-center justify-end px-12 py-4",
        onClick: ()=>setShowActionsMenu(false),
        children: [
            socket.currentRoom ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-1 mb-4",
                        children: [
                            messages.map((msg, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$components$2f$chat$2f$MessageBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    message: msg,
                                    isOwnMessage: msg.pseudo === pseudo,
                                    onImageClick: setSelectedImage
                                }, index, false, {
                                    fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                    lineNumber: 129,
                                    columnNumber: 29
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: messagesEndRef
                            }, void 0, false, {
                                fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                lineNumber: 136,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                        lineNumber: 127,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full mb-4",
                        children: [
                            photo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$components$2f$chat$2f$ImagePreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                imageData: photo,
                                onDelete: deletePhoto
                            }, void 0, false, {
                                fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                lineNumber: 141,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex items-center",
                                onClick: (e)=>e.stopPropagation(),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: message,
                                        onChange: (e)=>setMessage(e.target.value),
                                        onKeyDown: (e)=>e.key === "Enter" && handleSendClick(),
                                        placeholder: "Message ...",
                                        disabled: !!photo,
                                        className: "border rounded-full pl-4 pr-16 py-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
                                    }, void 0, false, {
                                        fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                        lineNumber: 145,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSendClick,
                                        className: "absolute right-4 text-violet-600 hover:text-violet-800 transition-colors cursor-pointer p-1",
                                        title: "Envoyer",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            viewBox: "0 0 24 24",
                                            fill: "currentColor",
                                            className: "w-6 h-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"
                                            }, void 0, false, {
                                                fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                                lineNumber: 162,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                            lineNumber: 161,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                        lineNumber: 156,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowActionsMenu(!showActionsMenu),
                                        className: "absolute right-12 text-gray-500 hover:text-violet-600 transition-colors cursor-pointer p-1 rounded-full ".concat(showActionsMenu ? 'bg-gray-100 text-violet-600' : ''),
                                        title: "Plus d'actions",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            viewBox: "0 0 24 24",
                                            fill: "currentColor",
                                            className: "w-7 h-7",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                fillRule: "evenodd",
                                                d: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z",
                                                clipRule: "evenodd"
                                            }, void 0, false, {
                                                fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                                lineNumber: 173,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                            lineNumber: 172,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                        lineNumber: 167,
                                        columnNumber: 29
                                    }, this),
                                    showActionsMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-0 bottom-14 bg-white rounded-lg shadow-xl border border-gray-100 p-2 flex flex-col gap-1 min-w-[200px] z-10 animate-in fade-in slide-in-from-bottom-2 duration-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    handleCameraButtonClick();
                                                    setShowActionsMenu(false);
                                                },
                                                className: "flex items-center gap-3 px-3 py-2 hover:bg-violet-50 rounded-md text-gray-700 transition-colors text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xl",
                                                        children: "📸"
                                                    }, void 0, false, {
                                                        fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                                        lineNumber: 187,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-sm",
                                                        children: "Prendre photo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                                        lineNumber: 188,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                                lineNumber: 180,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setGalleryOpen(true);
                                                    setShowActionsMenu(false);
                                                },
                                                className: "flex items-center gap-3 px-3 py-2 hover:bg-violet-50 rounded-md text-gray-700 transition-colors text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xl",
                                                        children: "🖼️"
                                                    }, void 0, false, {
                                                        fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                                        lineNumber: 197,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-sm",
                                                        children: "Galerie"
                                                    }, void 0, false, {
                                                        fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                                        lineNumber: 198,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                                lineNumber: 190,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-px bg-gray-100 my-1"
                                            }, void 0, false, {
                                                fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                                lineNumber: 200,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: async ()=>{
                                                    setShowActionsMenu(false);
                                                    try {
                                                        if (!navigator.getBattery) {
                                                            alert("Cette fonctionnalité n'est pas supportée sur votre appareil (ex: iOS).");
                                                            return;
                                                        }
                                                        const battery = await navigator.getBattery();
                                                        const level = Math.round(battery.level * 100);
                                                        const icon = level > 20 ? '🔋' : '🪫';
                                                        const charging = battery.charging ? '⚡' : '';
                                                        socket.sendMessage("".concat(icon, " J'ai ").concat(level, "% de batterie ").concat(charging));
                                                    } catch (e) {
                                                        console.error(e);
                                                        alert("Impossible d'accéder aux infos de batterie");
                                                    }
                                                },
                                                className: "flex items-center gap-3 px-3 py-2 hover:bg-violet-50 rounded-md text-gray-700 transition-colors text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xl",
                                                        children: "⚡"
                                                    }, void 0, false, {
                                                        fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-sm",
                                                        children: "Partager batterie"
                                                    }, void 0, false, {
                                                        fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                                        lineNumber: 222,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                                lineNumber: 201,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setShowActionsMenu(false);
                                                    if (!navigator.geolocation) {
                                                        alert("La géolocalisation n'est pas supportée par votre navigateur.");
                                                        return;
                                                    }
                                                    navigator.geolocation.getCurrentPosition((position)=>{
                                                        const { latitude, longitude } = position.coords;
                                                        const link = "https://www.google.com/maps?q=".concat(latitude, ",").concat(longitude);
                                                        socket.sendMessage("📍 Ma position : ".concat(link));
                                                    }, (error)=>{
                                                        console.error("Erreur géolocalisation:", error);
                                                        alert("Impossible de récupérer votre position (autorisation refusée ?)");
                                                    });
                                                },
                                                className: "flex items-center gap-3 px-3 py-2 hover:bg-violet-50 rounded-md text-gray-700 transition-colors text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xl",
                                                        children: "📍"
                                                    }, void 0, false, {
                                                        fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-sm",
                                                        children: "Partager position"
                                                    }, void 0, false, {
                                                        fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                                        lineNumber: 246,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                                lineNumber: 224,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                        lineNumber: 179,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                                lineNumber: 144,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                        lineNumber: 139,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-500",
                children: "Sélectionnez une room pour commencer à discuter"
            }, void 0, false, {
                fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                lineNumber: 254,
                columnNumber: 17
            }, this),
            cameraOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$components$2f$chat$2f$CameraView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onPhotoTaken: handlePhotoTaken,
                onClose: ()=>setCameraOpen(false)
            }, void 0, false, {
                fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                lineNumber: 258,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$components$2f$chat$2f$GalleryModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: galleryOpen,
                onClose: ()=>setGalleryOpen(false),
                onSelectPhoto: handleSelectPhoto
            }, void 0, false, {
                fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                lineNumber: 261,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$components$2f$chat$2f$ImageViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                imageData: selectedImage,
                onClose: ()=>setSelectedImage(null)
            }, void 0, false, {
                fileName: "[project]/chat_app_pwa/components/Chat.tsx",
                lineNumber: 267,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/chat_app_pwa/components/Chat.tsx",
        lineNumber: 124,
        columnNumber: 9
    }, this);
}
_s(Chat, "R+ScUXhEIW7STF28Beq84wJmJ7g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$contexts$2f$SocketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"]
    ];
});
_c = Chat;
var _c;
__turbopack_context__.k.register(_c, "Chat");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/chat_app_pwa/components/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$contexts$2f$SocketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/contexts/SocketContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function Sidebar() {
    _s();
    const [rooms, setRooms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [newRoomName, setNewRoomName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const { pseudo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$contexts$2f$SocketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"])();
    const [openModal, setOpenModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            const fetchRooms = {
                "Sidebar.useEffect.fetchRooms": async ()=>{
                    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchData"])("/rooms");
                    if (data === null || data === void 0 ? void 0 : data.data) setRooms(Object.keys(data.data));
                }
            }["Sidebar.useEffect.fetchRooms"];
            fetchRooms();
        }
    }["Sidebar.useEffect"], []);
    const handleJoinRoom = (roomName)=>{
        if (!socket) return;
        socket.joinRoom(roomName, pseudo);
    };
    const handleCreateRoom = async ()=>{
        if (newRoomName.trim() === "") return;
        handleJoinRoom(encodeURIComponent(newRoomName.trim()));
        setNewRoomName("");
        setOpenModal(false);
    };
    const filteredRooms = rooms.filter((room)=>decodeURIComponent(room).toLowerCase().includes(searchTerm.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[calc(100vh-57px)] w-2/7 flex flex-col p-4 border-r border-gray-300 bg-gray-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex flex-col gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-xl font-semibold",
                                        children: "Conversations"
                                    }, void 0, false, {
                                        fileName: "[project]/chat_app_pwa/components/Sidebar.tsx",
                                        lineNumber: 45,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setOpenModal(true),
                                        className: "w-[32px] h-[32px] aspect-square bg-violet-600 text-white rounded-full cursor-pointer text-xl flex items-center justify-center hover:bg-violet-700 transition-colors shadow-sm",
                                        children: "+"
                                    }, void 0, false, {
                                        fileName: "[project]/chat_app_pwa/components/Sidebar.tsx",
                                        lineNumber: 46,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/chat_app_pwa/components/Sidebar.tsx",
                                lineNumber: 44,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Rechercher...",
                                        value: searchTerm,
                                        onChange: (e)=>setSearchTerm(e.target.value),
                                        className: "w-full px-4 py-2 pl-9 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white shadow-sm transition-all"
                                    }, void 0, false, {
                                        fileName: "[project]/chat_app_pwa/components/Sidebar.tsx",
                                        lineNumber: 51,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
                                        children: "🔍"
                                    }, void 0, false, {
                                        fileName: "[project]/chat_app_pwa/components/Sidebar.tsx",
                                        lineNumber: 58,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/chat_app_pwa/components/Sidebar.tsx",
                                lineNumber: 50,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/chat_app_pwa/components/Sidebar.tsx",
                        lineNumber: 43,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-y-auto flex flex-col gap-2 flex-1",
                        children: filteredRooms.length > 0 ? filteredRooms.map((room)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>handleJoinRoom(room),
                                className: "w-full bg-white border-l-4 ".concat(room === (socket === null || socket === void 0 ? void 0 : socket.currentRoom) ? "border-violet-600 bg-violet-50" : "border-transparent", " hover:border-violet-600 hover:bg-violet-50 transition-all cursor-pointer p-4 rounded-r-lg shadow-sm flex justify-between items-center"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "truncate font-medium text-[15px] text-gray-700",
                                    children: decodeURIComponent(room)
                                }, void 0, false, {
                                    fileName: "[project]/chat_app_pwa/components/Sidebar.tsx",
                                    lineNumber: 72,
                                    columnNumber: 33
                                }, this)
                            }, room, false, {
                                fileName: "[project]/chat_app_pwa/components/Sidebar.tsx",
                                lineNumber: 66,
                                columnNumber: 29
                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center text-gray-400 mt-4 text-sm",
                            children: "Aucune conversation trouvée"
                        }, void 0, false, {
                            fileName: "[project]/chat_app_pwa/components/Sidebar.tsx",
                            lineNumber: 78,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/chat_app_pwa/components/Sidebar.tsx",
                        lineNumber: 63,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/chat_app_pwa/components/Sidebar.tsx",
                lineNumber: 42,
                columnNumber: 13
            }, this),
            openModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-screen h-screen overflow-hidden absolute top-0 left-0 z-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-full bg-black opacity-70 flex justify-center items-center",
                        onClick: ()=>setOpenModal(false)
                    }, void 0, false, {
                        fileName: "[project]/chat_app_pwa/components/Sidebar.tsx",
                        lineNumber: 87,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-4 rounded-lg flex flex-col items-start gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold",
                                children: "Créer une nouvelle conversation"
                            }, void 0, false, {
                                fileName: "[project]/chat_app_pwa/components/Sidebar.tsx",
                                lineNumber: 91,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                className: "w-full border-1 border-black p-1 rounded-md",
                                value: newRoomName,
                                onChange: (e)=>setNewRoomName(e.target.value),
                                onKeyDown: (e)=>e.key === "Enter" && handleCreateRoom(),
                                placeholder: "Nom de la conversation"
                            }, void 0, false, {
                                fileName: "[project]/chat_app_pwa/components/Sidebar.tsx",
                                lineNumber: 92,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleCreateRoom,
                                className: "bg-violet-600 px-4 py-1 cursor-pointer rounded-md text-white",
                                children: "Créer"
                            }, void 0, false, {
                                fileName: "[project]/chat_app_pwa/components/Sidebar.tsx",
                                lineNumber: 100,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/chat_app_pwa/components/Sidebar.tsx",
                        lineNumber: 90,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/chat_app_pwa/components/Sidebar.tsx",
                lineNumber: 86,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
}
_s(Sidebar, "dnYDkM7B2I3iV4aK4CWh7LjvGtA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$contexts$2f$SocketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=chat_app_pwa_b7760bbf._.js.map