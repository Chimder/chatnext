import { WebSocketProvider } from "@/components/WebSocketProvider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
      <main
        className={`flex overflow-y-hidden h-[100vh]  p-24 ${inter.className}`}
      >
        <div>Loxx</div>
      </main>
  );
}
