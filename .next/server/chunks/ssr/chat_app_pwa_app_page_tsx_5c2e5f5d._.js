module.exports = [
"[project]/chat_app_pwa/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/chat_app_pwa/contexts/AuthContext.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Home() {
    const { registerUser, pseudo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [pseudoInput, setPseudoInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(pseudo || "");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleLogin = ()=>{
        registerUser(pseudoInput);
        router.push("/chat");
        setPseudoInput("");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-[calc(100vh-57px)] w-full flex",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-1/2 border-r border-gray-300 my-5"
            }, void 0, false, {
                fileName: "[project]/chat_app_pwa/app/page.tsx",
                lineNumber: 19,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-1/2 flex flex-col justify-center items-center gap-4",
                children: pseudo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        "Bonjour, ",
                        pseudo,
                        "!"
                    ]
                }, void 0, true, {
                    fileName: "[project]/chat_app_pwa/app/page.tsx",
                    lineNumber: 24,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2 items-center px-8 w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: pseudoInput,
                            placeholder: "Entrez votre pseudo",
                            onChange: (e)=>setPseudoInput(e.target.value),
                            onKeyDown: (e)=>e.key === "Enter" && handleLogin(),
                            className: "border p-2 rounded w-full"
                        }, void 0, false, {
                            fileName: "[project]/chat_app_pwa/app/page.tsx",
                            lineNumber: 27,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$chat_app_pwa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleLogin,
                            className: "bg-blue-500 text-white px-4 py-2 rounded mt-2 cursor-pointer w-full",
                            children: "Se connecter"
                        }, void 0, false, {
                            fileName: "[project]/chat_app_pwa/app/page.tsx",
                            lineNumber: 35,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/chat_app_pwa/app/page.tsx",
                    lineNumber: 26,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/chat_app_pwa/app/page.tsx",
                lineNumber: 22,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/chat_app_pwa/app/page.tsx",
        lineNumber: 18,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=chat_app_pwa_app_page_tsx_5c2e5f5d._.js.map