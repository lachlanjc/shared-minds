"use client";
import dynamic from "next/dynamic";
const Globe = dynamic(() => import("./globe"), { ssr: false });
import { RoomProvider } from "./liveblocks.config";
import { LiveList } from "@liveblocks/client";
import FRIENDS from "./friends";
import { UserButton } from "@clerk/nextjs";
import Profile from "./profile";

export default async function ThreeD() {
  return (
    <RoomProvider
      id="week-5"
      initialPresence={{}}
      initialStorage={{
        arcs: new LiveList([]),
        friends: new LiveList(FRIENDS),
      }}
    >
      <Globe />
      <div className="fixed left-12 top-12 text-white">
        <h1 className="mb-4 text-3xl font-bold text-white">Friends</h1>
        <div className="flex gap-4">
          <UserButton />
          <Profile />
        </div>
      </div>
      <style>{`
        html {
          color-scheme: dark;
        }
      `}</style>
    </RoomProvider>
  );
}
