(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/chat_app_pwa/contexts/SocketContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SocketProvider",
    ()=>SocketProvider,
    "useSocket",
    ()=>useSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const SocketContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const SocketProvider = (param)=>{
    let { children } = param;
    _s();
    const [socket, setSocket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentRoom, setCurrentRoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SocketProvider.useEffect": ()=>{
            const newSocket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])("https://api.tools.gavago.fr", {
                transports: [
                    "websocket"
                ],
                autoConnect: true,
                reconnection: true,
                reconnectionAttempts: Infinity
            });
            newSocket.on("connect", {
                "SocketProvider.useEffect": ()=>{
                    console.log("🟢 Connecté au serveur Socket.IO");
                }
            }["SocketProvider.useEffect"]);
            newSocket.on("disconnect", {
                "SocketProvider.useEffect": (reason)=>{
                    console.log("🔴 Déconnecté du serveur Socket.IO", reason);
                }
            }["SocketProvider.useEffect"]);
            newSocket.on("connect_error", {
                "SocketProvider.useEffect": (error)=>{
                    console.log("⚠️ Erreur de connexion Socket.IO", error);
                }
            }["SocketProvider.useEffect"]);
            setSocket(newSocket);
            return ({
                "SocketProvider.useEffect": ()=>{
                    newSocket.disconnect();
                }
            })["SocketProvider.useEffect"];
        }
    }["SocketProvider.useEffect"], []);
    const joinRoom = (roomName, pseudo)=>{
        if (!socket) return;
        if (currentRoom === roomName) return;
        socket.off("chat-join-room");
        setCurrentRoom(null);
        socket.emit("chat-join-room", {
            pseudo,
            roomName
        });
        setCurrentRoom(roomName);
    };
    const sendMessage = (message)=>{
        if (!currentRoom || !socket) return;
        socket.emit("chat-msg", {
            content: message,
            roomName: currentRoom
        });
    };
    const sendImageMessage = (imageData)=>{
        if (!currentRoom || !socket) return;
        socket.emit("chat-msg", {
            content: imageData,
            roomName: currentRoom
        });
    };
    const getMessages = (callback)=>{
        if (!socket) return;
        socket.off("chat-msg");
        socket.on("chat-msg", (data)=>{
            callback(data);
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SocketContext.Provider, {
        value: {
            socket,
            currentRoom,
            joinRoom,
            sendMessage,
            sendImageMessage,
            getMessages
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/chat_app_pwa/contexts/SocketContext.tsx",
        lineNumber: 90,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SocketProvider, "9+spBoKyeUuR+Vo3E1AQEg5JvpY=");
_c = SocketProvider;
const useSocket = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};
_s1(useSocket, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "SocketProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=chat_app_pwa_contexts_SocketContext_tsx_944fc0ca._.js.map