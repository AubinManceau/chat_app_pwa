"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

interface NotificationContextType {
    permission: NotificationPermission;
    isSupported: boolean;
    requestPermission: () => Promise<NotificationPermission>;
    showNotification: (title: string, options?: NotificationOptions) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [permission, setPermission] = useState<NotificationPermission>("default");
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && "Notification" in window) {
            setIsSupported(true);
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
        if (!isSupported) {
            console.warn("Notifications not supported");
            return "denied";
        }

        try {
            const result = await Notification.requestPermission();
            setPermission(result);
            return result;
        } catch (error) {
            console.error("Error requesting notification permission:", error);
            return "denied";
        }
    }, [isSupported]);

    const showNotification = useCallback((title: string, options?: NotificationOptions) => {
        if (!isSupported || permission !== "granted") {
            console.warn("Cannot show notification: permission not granted or not supported");
            return;
        }

        if (document.hidden) {
            if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
                navigator.serviceWorker.ready.then((registration) => {
                    registration.showNotification(title, {
                        icon: "/icons/192.png",
                        badge: "/icons/192.png",
                        requireInteraction: false,
                        ...options,
                    });
                });
            } else {
                new Notification(title, {
                    icon: "/icons/192.png",
                    badge: "/icons/192.png",
                    ...options,
                });
            }
        }
    }, [isSupported, permission]);

    return (
        <NotificationContext.Provider value={{
            permission,
            isSupported,
            requestPermission,
            showNotification
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
};
