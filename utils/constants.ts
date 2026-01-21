export const API_BASE_URL = "https://api.tools.gavago.fr/socketio/api";
export const SOCKET_URL = "https://api.tools.gavago.fr";

export const SOCKET_CONFIG = {
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    forceNew: true,
};

export const OFFLINE_QUEUE_CONFIG = {
    maxRetryCount: 3,
    debounceTime: 300,
    heartbeatInterval: 500,
    flushDelay: 500,
    sendDelay: 100,
};

export const FILE_VALIDATION = {
    acceptedTypes: ["image/png", "image/jpeg", "image/jpg"],
    acceptedExtensions: [".png", ".jpg", ".jpeg"],
    maxImageHeight: 200,
};

export const UI_CONFIG = {
    roomRefreshInterval: 5000,
};

export const BATTERY_ICONS = {
    high: "🔋",
    low: "🪫",
    charging: "⚡",
};

export const MESSAGE_CATEGORIES = {
    MESSAGE: "MESSAGE",
    INFO: "INFO",
    NEW_IMAGE: "NEW_IMAGE",
} as const;
