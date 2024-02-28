// @ts-nocheck my liveblocks config is not typed
import Globe, { GlobeMethods } from "react-globe.gl";
import React, { useRef, useEffect } from "react";
import { useStorage, useMutation } from "./liveblocks.config";
import { useUser } from "@clerk/clerk-react";
// import texture from "./clouds.png";

const FLIGHT_TIME = 5000;

export default function Map() {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);

  const { user, isLoaded } = useUser();
  const liveFriends = useStorage((s) => s.friends);
  const liveArcs = useStorage((s) => s.arcs);
  const sendArc = useMutation(({ storage }, newArc) => {
    storage.get("arcs").push(newArc);
    setTimeout(() => {
      const index = storage.get("arcs").indexOf(newArc);
      storage.get("arcs").delete(index);
    }, FLIGHT_TIME * 2);
  }, []);

  const profile =
    isLoaded && user && liveFriends?.length > 0
      ? liveFriends.find((f) => f.github === user.username)
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
        img.src = `https://github.com/${friend.github}.png`;
        img.width = 48;
        img.height = 48;
        img.alt = friend.name;
        img.style.border =
          // isLoaded && user?.github === friend.github
          //   ? "2px solid red" :
          "2px solid rgba(255,255,255,0.5)";
        img.style.borderRadius = "50%";
        return img;
      }}
      arcsData={liveArcs}
      arcColor={() => "red"}
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
