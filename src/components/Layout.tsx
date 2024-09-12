import React from "react";
import NavBar from "./NavBar/navBar";
import { ThemeProvider } from "./theme-provider";
import { WebSocketProvider } from "./WebSocketProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
        <WebSocketProvider>
          <main className="overflow-y-hidden h-[100vh]">{children}</main>
        </WebSocketProvider>
    </>
  );
}
