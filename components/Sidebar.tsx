"use client";

import { useEffect, useState } from "react";
import { fetchData } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/contexts/SocketContext";

export default function Sidebar() {
    const [rooms, setRooms] = useState<string[]>([]);
    const [newRoomName, setNewRoomName] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
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

    const filteredRooms = rooms.filter(room =>
        decodeURIComponent(room).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="h-[calc(100vh-57px)] w-2/7 flex flex-col p-4 border-r border-gray-300 bg-gray-50">
                <div className="mb-4 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold">Conversations</h1>
                        <button onClick={() => setOpenModal(true)} className="w-[32px] h-[32px] aspect-square bg-violet-600 text-white rounded-full cursor-pointer text-xl flex items-center justify-center hover:bg-violet-700 transition-colors shadow-sm">
                            +
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-9 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white shadow-sm transition-all"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            🔍
                        </span>
                    </div>
                </div>
                <div className="overflow-y-auto flex flex-col gap-2 flex-1">
                    {filteredRooms.length > 0 ? (
                        filteredRooms.map((room) => (
                            <div
                                key={room}
                                onClick={() => handleJoinRoom(room)}
                                className={`w-full bg-white border-l-4 ${room === socket?.currentRoom ? "border-violet-600 bg-violet-50" : "border-transparent"
                                    } hover:border-violet-600 hover:bg-violet-50 transition-all cursor-pointer p-4 rounded-r-lg shadow-sm flex justify-between items-center`}
                            >
                                <p className="truncate font-medium text-[15px] text-gray-700">
                                    {decodeURIComponent(room)}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-400 mt-4 text-sm">
                            Aucune conversation trouvée
                        </div>
                    )}
                </div>
            </div>

            {openModal && (
                <div className="w-screen h-screen overflow-hidden absolute top-0 left-0 z-20">
                    <div className="w-full h-full bg-black opacity-70 flex justify-center items-center" onClick={() => setOpenModal(false)}>

                    </div>
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-4 rounded-lg flex flex-col items-start gap-4">
                        <h2 className="text-xl font-semibold">Créer une nouvelle conversation</h2>
                        <input
                            type="text"
                            className="w-full border-1 border-black p-1 rounded-md"
                            value={newRoomName}
                            onChange={(e) => setNewRoomName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleCreateRoom()}
                            placeholder="Nom de la conversation"
                        />
                        <button onClick={handleCreateRoom} className="bg-violet-600 px-4 py-1 cursor-pointer rounded-md text-white">Créer</button>
                    </div>
                </div>
            )}
        </>
    );
}
