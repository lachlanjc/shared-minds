"use client";
import dynamic from "next/dynamic";
const Globe = dynamic(() => import("./globe"), { ssr: false });

export default function ThreeD() {
  return <Globe />;
}
