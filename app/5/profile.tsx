"use client";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { useStorage, useMutation } from "./liveblocks.config";

const button =
  "bg-gray-1000 text-background-100 phover:enabled:border-[#000] phover:enabled:outline-[#ededed]/[0.24] flex h-7 items-center justify-center whitespace-nowrap rounded-[6px] border-2 border-[#ededed]/[0.12] px-2 font-mono text-[13px]/[20px] font-semibold uppercase outline-none outline-[4px] outline-offset-0 outline-[transparent] md:h-8 md:px-4";

export default function Profile() {
  const { isSignedIn, user, isLoaded } = useUser();
  const friends = useStorage((s) => s.friends);
  const addToFriends = useMutation(
    ({ storage }, lat: number, lng: number) => {
      storage.get("friends").push({
        lat,
        lng,
        github: user?.username!,
        name: user?.fullName!,
      });
    },
    [user],
  );
  const removeFromFriends = useMutation(
    ({ storage }) => {
      const myIndex = storage
        .get("friends")
        .findIndex((f) => f.github === user?.username);
      storage.get("friends").delete(myIndex);
    },
    [user],
  );

  if (!isLoaded) {
    // Handle loading state however you like
    return null;
  }

  if (isSignedIn) {
    if (friends?.find((f) => f.github === user.username)) {
      return (
        <div>
          <p className="mb-3 text-gray-200">Hello {user.username}!</p>
          <button className={button} onClick={removeFromFriends}>
            Remove me
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <p className="mb-3 text-gray-200">
            Before you can send vibes,
            <br />
            add yourself to the globe:
          </p>
          <button
            className={button}
            onClick={() => {
              navigator.geolocation.getCurrentPosition((position) => {
                addToFriends(
                  position.coords.latitude,
                  position.coords.longitude,
                );
              });
            }}
          >
            Locate me
          </button>
        </div>
      );
    }
  }

  return (
    <SignInButton>
      <button className={button}>Sign in</button>
    </SignInButton>
  );
}
