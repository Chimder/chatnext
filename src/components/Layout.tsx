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
          <main>{children}</main>
        </WebSocketProvider>
      </ThemeProvider>
    </>
  );
}
