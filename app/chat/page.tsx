import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar";

export default function ChatPage() {
    return (
        <div className="h-full w-full flex">
            <Sidebar />
            <Chat />
        </div>
    );
}