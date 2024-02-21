import { LiveList, JsonObject, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY ?? "",
});

type Presence = {};

interface Arc extends JsonObject {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  time: string;
}

type Storage = {
  arcs: LiveList<Arc>;
};
type UserMeta = {};
type RoomEvent = {};

export const {
  RoomProvider,
  useMyPresence,
  useStorage,
  useMutation,
  /* ...all the other hooks you’re using... */
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);
