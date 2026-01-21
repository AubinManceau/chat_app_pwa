import { SocketProvider } from "@/contexts/SocketContext";
import { OfflineQueueProvider } from "@/contexts/OfflineQueueContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <SocketProvider>
      <OfflineQueueProvider>
        {children}
      </OfflineQueueProvider>
    </SocketProvider>
  );
}
