import React from "react";
import NavBar from "./navBar";
import { ThemeProvider } from "./theme-provider";
import { WebSocketProvider } from "./WebSocketProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <WebSocketProvider>
          <main className="overflow-y-hidden h-[100vh]">{children}</main>
        </WebSocketProvider>
      </ThemeProvider>
    </>
  );
}
