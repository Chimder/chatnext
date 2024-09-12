import React from "react";
import NavBar from "../NavBar/navBar";
import { WebSocketProvider } from "../WebSocketProvider";
import s from "./layoutx.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <WebSocketProvider>
        <main className={s.main}>{children}</main>
      </WebSocketProvider>
    </>
  );
}
