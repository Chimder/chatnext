import Link from "next/link";
import React from "react";

export default function Custom404() {
  return (
    <>
      <button className="mainHome">
        <Link href={"/"}>Go home</Link>
      </button>
    </>
  );
}
