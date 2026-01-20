import { SocketProvider } from "@/contexts/SocketContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <SocketProvider>
      {children}
    </SocketProvider>
  );
}
