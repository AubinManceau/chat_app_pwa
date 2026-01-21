"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/contexts/SocketContext";
import { useRoomManagement } from "@/hooks/useRoomManagement";
import { decodeRoomName, encodeRoomName } from "@/utils/formatters";
import { ClientData } from "@/types/chat";

export default function Sidebar() {
    const [viewingRoomUsers, setViewingRoomUsers] = useState<string | null>(null);
    const [newRoomName, setNewRoomName] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const { pseudo } = useAuth();
    const socket = useSocket();
    const [openModal, setOpenModal] = useState(false);
    const { rooms, updateRoomClients, removeClientFromRoom } = useRoomManagement();

    useEffect(() => {
        if (!socket?.socket) return;

        const onJoinedRoom = (data: { roomName: string, clients: Record<string, ClientData> }) => {
            updateRoomClients(data.roomName, data.clients);
        };

        const onDisconnected = (data: { id: string, pseudo: string, roomName: string }) => {
            removeClientFromRoom(data.roomName, data.id);
        };

        socket.socket.on("chat-joined-room", onJoinedRoom);
        socket.socket.on("chat-disconnected", onDisconnected);

        return () => {
            socket.socket?.off("chat-joined-room", onJoinedRoom);
            socket.socket?.off("chat-disconnected", onDisconnected);
        };
    }, [socket?.socket, updateRoomClients, removeClientFromRoom]);

    const handleJoinRoom = (roomName: string) => {
        if (!socket) return;
        socket.joinRoom(roomName, pseudo);
    };

    const handleCreateRoom = async () => {
        if (newRoomName.trim() === "") return;
        handleJoinRoom(encodeRoomName(newRoomName));
        setNewRoomName("");
        setOpenModal(false);
    };

    const filteredRooms = Object.keys(rooms).filter(room =>
        decodeRoomName(room).toLowerCase().includes(searchTerm.toLowerCase())
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
                                className={`w-full bg-white border-l-4 ${room === socket?.currentRoom ? "border-violet-600 bg-violet-50" : "border-transparent"
                                    } hover:border-violet-600 hover:bg-violet-50 transition-all rounded-r-lg shadow-sm p-3`}
                            >
                                <div className="w-full cursor-pointer" onClick={() => handleJoinRoom(room)}>
                                    <p className="truncate font-medium text-[15px] text-gray-700">
                                        {decodeRoomName(room)}
                                    </p>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-xs text-gray-400">
                                            {Object.keys(rooms[room].clients).length} connecté(s)
                                        </p>
                                        {room === socket?.currentRoom && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setViewingRoomUsers(room);
                                                }}
                                                className="bg-violet-100 text-violet-600 hover:bg-violet-200 px-3 py-1 rounded-full text-xs font-semibold transition-colors"
                                            >
                                                VOIR
                                            </button>
                                        )}
                                    </div>
                                </div>
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
                <div className="w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center">
                    <div className="absolute w-full h-full bg-black/60 backdrop-blur-sm" onClick={() => setOpenModal(false)}></div>
                    <div className="bg-white px-6 py-6 rounded-2xl shadow-2xl flex flex-col gap-4 w-[90%] max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">Nouvelle conversation</h2>
                            <button onClick={() => setOpenModal(false)} className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                            value={newRoomName}
                            onChange={(e) => setNewRoomName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleCreateRoom()}
                            placeholder="Nom de la conversation..."
                            autoFocus
                        />
                        <button onClick={handleCreateRoom} className="bg-violet-600 hover:bg-violet-700 w-full py-3 rounded-xl text-white font-semibold shadow-lg shadow-violet-200 transition-all transform active:scale-95">
                            Créer la conversation
                        </button>
                    </div>
                </div>
            )}

            {viewingRoomUsers && (
                <div className="w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center">
                    <div className="absolute w-full h-full bg-black/60 backdrop-blur-sm" onClick={() => setViewingRoomUsers(null)}></div>
                    <div className="bg-white px-6 py-6 rounded-2xl shadow-2xl flex flex-col gap-4 w-[90%] max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                Utilisateurs connectés
                                <span className="block text-sm text-violet-600 font-normal mt-1">
                                    {decodeRoomName(viewingRoomUsers)}
                                </span>
                            </h2>
                            <button onClick={() => setViewingRoomUsers(null)} className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {rooms[viewingRoomUsers] && Object.values(rooms[viewingRoomUsers].clients).length > 0 ? (
                                <div className="flex flex-col gap-2">
                                    {Object.values(rooms[viewingRoomUsers].clients).map((client) => (
                                        <div key={client.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold text-sm">
                                                {client.pseudo.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium text-gray-700">{client.pseudo}</span>
                                            {client.id === socket?.socketId && (
                                                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full ml-auto">Vous</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-4">Aucun utilisateur connecté</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
