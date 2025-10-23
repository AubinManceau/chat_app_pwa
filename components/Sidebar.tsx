"use client";

import { useEffect, useState } from "react";
import { fetchData } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/contexts/SocketContext";

export default function Sidebar() {
    const [rooms, setRooms] = useState<string[]>([]);
    const { pseudo } = useAuth();
    const socket = useSocket();

    useEffect(() => {
        const fetchRooms = async () => {
            const data = await fetchData("/rooms");
            if (data?.data) setRooms(Object.keys(data.data));
        };
        fetchRooms();
    }, []);

    const handleJoinRoom = (roomName: string) => {
        if (!socket) return;
        socket.joinRoom(roomName, pseudo);
    };

    return (
        <div className="h-[calc(100vh-57px)] w-2/7 flex flex-col p-4 border-r border-gray-300 bg-gray-50">
            <h1 className="text-xl font-semibold mb-4">Conversations</h1>
            <div className="overflow-y-auto flex flex-col gap-2 flex-1">
                {rooms.map((room) => (
                    <div
                        key={room}
                        onClick={() => handleJoinRoom(room)}
                        className="w-[95%] bg-white border-l-5 border-white hover:border-blue-500 transition-colors cursor-pointer p-3 flex justify-between items-center last:mb-4"
                    >
                        <p className="truncate h-[60px] font-bold text-[16px]">
                            {decodeURIComponent(room)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
