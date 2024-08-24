import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Custom404() {
  return (
    <>
      <Button className="absolute left-1/2 top-1/2">
        <Link href={"/"}>Go home </Link>
      </Button>
    </>
  );
}
