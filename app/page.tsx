"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
    const { registerUser, pseudo } = useAuth();
    const [pseudoInput, setPseudoInput] = useState(pseudo || "");
    const router = useRouter();

    const handleLogin = () => {
        registerUser(pseudoInput);
        router.push("/chat");
        setPseudoInput("");
    }

    return (
        <div className="h-[calc(100vh-57px)] w-full flex">
            <div className="w-1/2 border-r border-gray-300 my-5">

            </div>
            <div className="w-1/2 flex flex-col justify-center items-center gap-4">
                {pseudo ? (
                    <p>Bonjour, {pseudo}!</p>
                ) : (
                    <div className="flex flex-col gap-2 items-center px-8 w-full">
                        <input
                            type="text"
                            value={pseudoInput}
                            placeholder="Entrez votre pseudo"
                            onChange={(e) => setPseudoInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            className="border p-2 rounded w-full"
                        />
                        <button
                            onClick={handleLogin}
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 cursor-pointer w-full"
                        >
                            Se connecter
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}