import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex overflow-y-hidden h-[100vh] ${inter.className}`}>
      <div className="absolute top-[46vh] left-1/2">Home</div>
    </main>
  );
}
