import Globe, { GlobeMethods } from "react-globe.gl";
import React, { useRef, useEffect } from "react";
import { useStorage, useMutation, type Friend } from "./liveblocks.config";
import { useUser } from "@clerk/clerk-react";
// @ts-expect-error not typed
import useSound from "use-sound";

const FLIGHT_TIME = 5000;

export default function Map() {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const [playPop] = useSound("/sounds/pop-up-off.mp3");

  const { user, isLoaded } = useUser();
  const liveFriends = useStorage((s) => s.friends);
  const liveArcs = useStorage((s) => s.arcs);
  const sendArc = useMutation(({ storage }, newArc) => {
    playPop();
    storage.get("arcs").push(newArc);
    setTimeout(() => {
      const index = storage.get("arcs").indexOf(newArc);
      storage.get("arcs").delete(index);
    }, FLIGHT_TIME * 2);
  }, []);

  const clearArcs = useMutation(({ storage }) => {
    storage.get("arcs").clear();
  }, []);
  // @ts-expect-error debugging tool
  window.clearArcs = clearArcs;

  const profile =
    isLoaded && user && liveFriends && liveFriends?.length > 0
      ? liveFriends?.find((f) => f.github === user.username)
      : null;

  // debugger;

  useEffect(() => {
    const globe = globeEl.current;
    if (!globe) return;

    if (profile) {
      globe.pointOfView({ lat: profile.lat, lng: profile.lng }, 1000);
    }
  }, [globeEl, profile]);

  console.log({ user, isLoaded, liveFriends, liveArcs, profile });

  if (liveArcs == null || liveFriends?.length == 0 || !isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Globe
      ref={globeEl}
      animateIn={false}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      htmlElementsData={JSON.parse(JSON.stringify(liveFriends))}
      htmlElement={(friend) => {
        const img = document.createElement("img");
        const { github, name } = friend as Friend;
        img.src = `https://github.com/${github}.png`;
        img.width = 48;
        img.height = 48;
        img.alt = name;
        img.style.border =
          user?.username === github
            ? "2px solid #21d7ff"
            : "2px solid rgba(255,255,255,0.5)";
        img.style.borderRadius = "50%";
        return img;
      }}
      // @ts-expect-error wrong shape
      arcsData={liveArcs}
      arcColor={() => "#FF4921"}
      arcDashLength={() => Math.random()}
      arcDashGap={() => Math.random()}
      arcDashAnimateTime={() => Math.random() * 4000 + 500}
      arcStroke={2}
      onGlobeClick={({ lat, lng }) => {
        if (!profile) return;
        const arc = {
          startLat: profile.lat,
          startLng: profile.lng,
          endLat: lat,
          endLng: lng,
          time: new Date().toISOString(),
        };
        sendArc(arc);
      }}
      // labelsData={liveFriends}
      // labelIncludeDot={false}
      // labelText="github"
    />
  );
}
