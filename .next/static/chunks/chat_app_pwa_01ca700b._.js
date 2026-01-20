(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/chat_app_pwa/app/gallery/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Gallery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$components$2f$chat$2f$ImageViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/components/chat/ImageViewer.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Gallery() {
    _s();
    const [photos, setPhotos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedImage, setSelectedImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Gallery.useEffect": ()=>{
            const storedPhotos = JSON.parse(localStorage.getItem("photos") || "[]");
            setPhotos(storedPhotos);
        }
    }["Gallery.useEffect"], []);
    const handleDeletePhoto = (index)=>{
        const updatedPhotos = photos.filter((_, i)=>i !== index);
        setPhotos(updatedPhotos);
        localStorage.setItem("photos", JSON.stringify(updatedPhotos));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-[calc(100vh-57px)] w-full p-4",
        children: [
            photos.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "h-full flex justify-center items-center",
                children: "Aucune photo enregistrée"
            }, void 0, false, {
                fileName: "[project]/chat_app_pwa/app/gallery/page.tsx",
                lineNumber: 24,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
                children: photos.map((photo, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: photo,
                                alt: "photo-".concat(index),
                                onClick: ()=>setSelectedImage(photo),
                                className: "rounded-lg shadow-md w-full h-auto object-cover cursor-pointer hover:shadow-xl transition-shadow"
                            }, void 0, false, {
                                fileName: "[project]/chat_app_pwa/app/gallery/page.tsx",
                                lineNumber: 31,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    handleDeletePhoto(index);
                                },
                                className: "w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center absolute top-2 right-2 shadow-lg hover:bg-red-600 transition-colors",
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/chat_app_pwa/app/gallery/page.tsx",
                                lineNumber: 37,
                                columnNumber: 29
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/chat_app_pwa/app/gallery/page.tsx",
                        lineNumber: 30,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/chat_app_pwa/app/gallery/page.tsx",
                lineNumber: 28,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$components$2f$chat$2f$ImageViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                imageData: selectedImage,
                onClose: ()=>setSelectedImage(null)
            }, void 0, false, {
                fileName: "[project]/chat_app_pwa/app/gallery/page.tsx",
                lineNumber: 51,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/chat_app_pwa/app/gallery/page.tsx",
        lineNumber: 22,
        columnNumber: 9
    }, this);
}
_s(Gallery, "PepBHpxJ73UuOkk7pFwHw78R9CI=");
_c = Gallery;
var _c;
__turbopack_context__.k.register(_c, "Gallery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=chat_app_pwa_01ca700b._.js.map