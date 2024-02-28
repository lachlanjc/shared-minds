// @ts-nocheck my liveblocks config is not typed
import Globe, { GlobeMethods } from "react-globe.gl";
import React, { useRef, useEffect } from "react";
import FRIENDS from "./friends";
import { useStorage, useMutation } from "./liveblocks.config";
// import texture from "./clouds.png";

const FLIGHT_TIME = 5000;

export default function Map({
  currentFriendIdx,
}: {
  currentFriendIdx: number;
}) {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);

  const liveArcs = useStorage((s) => s.arcs);
  const sendArc = useMutation(({ storage }, newArc) => {
    storage.get("arcs").push(newArc);
    setTimeout(() => {
      const index = storage.get("arcs").indexOf(newArc);
      storage.get("arcs").delete(index);
    }, FLIGHT_TIME * 2);
  }, []);

  useEffect(() => {
    const globe = globeEl.current;

    if (!globe) return;

    globeEl.current?.pointOfView(
      {
        lat: FRIENDS[currentFriendIdx].lat,
        lng: FRIENDS[currentFriendIdx].lng,
      },
      1000,
    );

    // Auto-rotate
    // globe.controls().autoRotate = true;
    // globe.controls().autoRotateSpeed = 0.35;

    // Add clouds sphere
    // const CLOUDS_IMG_URL = texture.src;
    // const CLOUDS_ALT = 0.004;
    // const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame

    // new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
    //   const clouds = new THREE.Mesh(
    //     new THREE.SphereGeometry(
    //       globe.getGlobeRadius() * (1 + CLOUDS_ALT),
    //       75,
    //       75,
    //     ),
    //     new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true }),
    //   );
    //   globe.scene().add(clouds);

    //   (function rotateClouds() {
    //     clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
    //     requestAnimationFrame(rotateClouds);
    //   })();
    // });
  }, [currentFriendIdx]);

  if (liveArcs == null) {
    return <div>Loading...</div>;
  }

  return (
    <Globe
      ref={globeEl}
      animateIn={false}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      htmlElementsData={FRIENDS}
      htmlElement={(friend) => {
        const { name, github } = friend as (typeof FRIENDS)[number];
        const img = document.createElement("img");
        img.src = `https://github.com/${github}.png`;
        img.width = 48;
        img.height = 48;
        img.alt = name;
        img.style.border = "2px solid rgba(255,255,255,0.5)";
        img.style.borderRadius = "50%";
        return img;
      }}
      arcsData={liveArcs}
      arcColor={() => "red"}
      arcDashLength={() => Math.random()}
      arcDashGap={() => Math.random()}
      arcDashAnimateTime={() => Math.random() * 4000 + 500}
      arcStroke={2}
      onGlobeReady={() => {
        globeEl.current?.pointOfView({
          lat: FRIENDS[currentFriendIdx].lat,
          lng: FRIENDS[currentFriendIdx].lng,
        });
      }}
      onGlobeClick={({ lat, lng }) => {
        const arc = {
          startLat: FRIENDS[currentFriendIdx].lat,
          startLng: FRIENDS[currentFriendIdx].lng,
          endLat: lat,
          endLng: lng,
          time: new Date().toISOString(),
        };
        sendArc(arc);
      }}
      labelsData={FRIENDS}
      // labelSize={1}
      labelIncludeDot={false}
      labelText="github"
    />
  );
}
