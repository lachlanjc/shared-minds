"use client";
import dynamic from "next/dynamic";
const Globe = dynamic(() => import("./globe"), { ssr: false });
import { RoomProvider } from "./liveblocks.config";
import { LiveList } from "@liveblocks/client";
import FRIENDS from "./friends";
import { useState } from "react";

export default function ThreeD() {
  const [currentFriendIdx, setCurrentFriendIdx] = useState(0);
  return (
    <>
      <RoomProvider
        id="week-4"
        initialPresence={{}}
        initialStorage={{
          arcs: new LiveList([]),
        }}
      >
        <Globe currentFriendIdx={currentFriendIdx} />
      </RoomProvider>
      <h1 className="fixed left-12 top-12 text-3xl font-bold text-white">
        Friends
      </h1>
      <label className="fixed left-12 top-24 flex items-center gap-4 text-white">
        I am:
        <select
          value={currentFriendIdx}
          onChange={(e) => setCurrentFriendIdx(Number(e.target.value))}
        >
          {FRIENDS.map((friend, i) => (
            <option key={friend.github} value={i}>
              {friend.github}
            </option>
          ))}
        </select>
      </label>
      <style>{`
        html {
          color-scheme: dark;
        }
      `}</style>
    </>
  );
}
