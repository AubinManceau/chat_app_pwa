import { formatBatteryMessage, formatLocationMessage } from "./formatters";

export const getBatteryStatus = async (): Promise<string> => {
    if (!navigator.getBattery) {
        throw new Error("Cette fonctionnalité n'est pas supportée sur votre appareil (ex: iOS).");
    }

    const battery = await navigator.getBattery();
    const level = Math.round(battery.level * 100);
    const charging = battery.charging;

    return formatBatteryMessage(level, charging);
};

export const getCurrentPosition = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("La géolocalisation n'est pas supportée par votre navigateur."));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve(formatLocationMessage(latitude, longitude));
            },
            (error) => {
                reject(new Error("Impossible de récupérer votre position (autorisation refusée ?)"));
            }
        );
    });
};
