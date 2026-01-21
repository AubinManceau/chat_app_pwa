export const padNumber = (n: number): string => n.toString().padStart(2, "0");

export const formatMessageDate = (dateString: string | null | undefined): string => {
    const date = new Date(dateString ?? Date.now());
    const now = new Date();

    const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    const hours = padNumber(date.getHours());
    const minutes = padNumber(date.getMinutes());

    if (isToday) {
        return `${hours}:${minutes}`;
    }

    const day = padNumber(date.getDate());
    const month = padNumber(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
};

export const decodeRoomName = (roomName: string): string => {
    return decodeURIComponent(roomName);
};

export const encodeRoomName = (roomName: string): string => {
    return encodeURIComponent(roomName.trim());
};

export const generateUniqueId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const formatBatteryMessage = (level: number, charging: boolean): string => {
    const icon = level > 20 ? "🔋" : "🪫";
    const chargingIcon = charging ? "⚡" : "";
    return `${icon} J'ai ${level}% de batterie ${chargingIcon}`;
};

export const formatLocationMessage = (latitude: number, longitude: number): string => {
    const link = `https://www.google.com/maps?q=${latitude},${longitude}`;
    return `📍 Ma position : ${link}`;
};
