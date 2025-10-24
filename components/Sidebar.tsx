"use client";

import { useEffect, useState } from "react";
import { fetchData } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/contexts/SocketContext";

export default function Sidebar() {
    const [rooms, setRooms] = useState<string[]>([]);
    const [newRoomName, setNewRoomName] = useState("");
    const { pseudo } = useAuth();
    const socket = useSocket();
    const [openModal, setOpenModal] = useState(false);

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

    const handleCreateRoom = async () => {
        if (newRoomName.trim() === "") return;
        handleJoinRoom(encodeURIComponent(newRoomName.trim()));
        setNewRoomName("");
        setOpenModal(false);
    };

    return (
        <>
            <div className="h-[calc(100vh-57px)] w-2/7 flex flex-col p-4 border-r border-gray-300 bg-gray-50">
                <div className="mb-4 flex justify-between">
                    <h1 className="text-xl font-semibold">Conversations</h1>
                <button onClick={() => setOpenModal(true)} className="w-[32px] h-[32px] aspect-square bg-violet-600 text-white rounded-full cursor-pointer text-xl">
                    +
                </button>
                </div>
                <div className="overflow-y-auto flex flex-col gap-2 flex-1">
                    {rooms.map((room) => (
                        <div
                            key={room}
                            onClick={() => handleJoinRoom(room)}
                            className={`w-[95%] bg-white border-l-5 ${
                            room === socket?.currentRoom ? "border-violet-600" : "border-white"
                            } hover:border-violet-600 transition-colors cursor-pointer p-3 flex justify-between items-center last:mb-4`}
                        >
                            <p className="truncate h-[60px] font-bold text-[16px]">
                            {decodeURIComponent(room)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {openModal && (
                <div className="w-screen h-screen overflow-hidden absolute top-0 left-0 z-20">
                    <div className="w-full h-full bg-black opacity-70 flex justify-center items-center" onClick={() => setOpenModal(false)}>
                        
                    </div>
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-4 rounded-lg flex flex-col items-start gap-4">
                        <h2 className="text-xl font-semibold">Créer une nouvelle conversation</h2>
                        <input type="text" className="w-full border-1 border-black p-1 rounded-md" value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)} placeholder="Nom de la conversation" />
                        <button onClick={handleCreateRoom} className="bg-violet-600 px-4 py-1 cursor-pointer rounded-md text-white">Créer</button>
                    </div>
                </div>
            )}
        </>
    );
}
