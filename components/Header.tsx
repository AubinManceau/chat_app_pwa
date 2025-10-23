"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { pseudo, clearUser } = useAuth();

  const handleLogOut = () => {
    clearUser();
    router.push("/");
  };

  return (
    <div className="w-full flex justify-between p-4 border-b border-gray-200">
      <Link href="/">Logo</Link>
      {pseudo && (
        <div className="flex gap-4 items-center">
          <Link href="/chat" className="">
            Chat
          </Link>
          <Link href="/gallery">Gallery</Link>
          <button onClick={handleLogOut} className="cursor-pointer">
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
}