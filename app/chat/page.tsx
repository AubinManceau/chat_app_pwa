import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar";

export default function ChatPage() {
    return (
        <div className="flex flex-1">
            <Sidebar />
            <Chat />
        </div>
    );
}