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

export interface Friend extends JsonObject {
  lat: number;
  lng: number;
  city?: string;
  name: string;
  github: string;
}

type Storage = {
  arcs: LiveList<Arc>;
  friends: LiveList<Friend>;
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
