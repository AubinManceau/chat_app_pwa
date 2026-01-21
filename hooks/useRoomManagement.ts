"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchData } from "@/lib/api";
import { RoomData } from "@/types/chat";
import { UI_CONFIG } from "@/utils/constants";

export const useRoomManagement = () => {
    const [rooms, setRooms] = useState<Record<string, RoomData>>({});

    const fetchRooms = useCallback(async () => {
        const data = await fetchData<Record<string, RoomData>>("/rooms");
        if (data?.data) setRooms(data.data);
    }, []);

    useEffect(() => {
        fetchRooms();
        const interval = setInterval(fetchRooms, UI_CONFIG.roomRefreshInterval);
        return () => clearInterval(interval);
    }, [fetchRooms]);

    const updateRoomClients = useCallback((roomName: string, clients: Record<string, any>) => {
        setRooms(prev => ({
            ...prev,
            [roomName]: {
                ...prev[roomName],
                clients
            }
        }));
    }, []);

    const removeClientFromRoom = useCallback((roomName: string, clientId: string) => {
        setRooms(prev => {
            if (!prev[roomName]) return prev;

            const newClients = { ...prev[roomName].clients };
            delete newClients[clientId];

            return {
                ...prev,
                [roomName]: {
                    ...prev[roomName],
                    clients: newClients
                }
            };
        });
    }, []);

    return {
        rooms,
        updateRoomClients,
        removeClientFromRoom,
    };
};
