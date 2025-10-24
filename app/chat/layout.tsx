import { SocketProvider } from "@/contexts/SocketContext";
import Header from "@/components/Header";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <SocketProvider>
      <Header />
      {children}
    </SocketProvider>
  );
}
