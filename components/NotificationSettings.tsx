"use client";

import { useNotification } from "@/contexts/NotificationContext";

export default function NotificationSettings() {
    const { permission, isSupported, requestPermission } = useNotification();

    if (!isSupported) {
        return (
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-sm text-gray-600">
                <p>❌ Les notifications ne sont pas supportées par votre navigateur</p>
            </div>
        );
    }

    const getStatusDisplay = () => {
        switch (permission) {
            case "granted":
                return {
                    icon: "✅",
                    text: "Notifications activées",
                    color: "text-green-700",
                    bgColor: "bg-green-50",
                    borderColor: "border-green-200"
                };
            case "denied":
                return {
                    icon: "🔕",
                    text: "Notifications bloquées",
                    color: "text-red-700",
                    bgColor: "bg-red-50",
                    borderColor: "border-red-200"
                };
            default:
                return {
                    icon: "⚠️",
                    text: "Notifications non configurées",
                    color: "text-yellow-700",
                    bgColor: "bg-yellow-50",
                    borderColor: "border-yellow-200"
                };
        }
    };

    const status = getStatusDisplay();

    return (
        <div className={`${status.bgColor} border ${status.borderColor} rounded-lg p-4`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{status.icon}</span>
                    <div>
                        <p className={`font-medium ${status.color}`}>{status.text}</p>
                        {permission === "denied" && (
                            <p className="text-xs text-gray-600 mt-1">
                                Veuillez autoriser les notifications dans les paramètres de votre navigateur
                            </p>
                        )}
                        {permission === "default" && (
                            <p className="text-xs text-gray-600 mt-1">
                                Cliquez pour activer les notifications de messages
                            </p>
                        )}
                    </div>
                </div>
                {permission === "default" && (
                    <button
                        onClick={requestPermission}
                        className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium"
                    >
                        Activer
                    </button>
                )}
            </div>
        </div>
    );
}
