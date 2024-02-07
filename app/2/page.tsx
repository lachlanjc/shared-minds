"use client";
import Globe, { GlobeMethods } from "react-globe.gl";
import cove from "./cove.json" assert { type: "json" };
import countries from "./countries.json" assert { type: "json" };
import { TERMINALS, STATUS_COLORS } from "./terminals";
import { useRef } from "react";

const [LAT, LNG] = [38.41, -76.37];

const arcsData = cove.map((record) => ({
  startLat: LAT,
  startLng: LNG,
  // @ts-expect-error lookup doesn't fail
  endLat: countries[record.destination]?.lat,
  // @ts-expect-error lookup doesn't fail
  endLng: countries[record.destination]?.lng,
  stroke: `${
    Math.floor(parseInt(record.volume.replaceAll(",", "")) / 1_000_000) - 2.5
  }px`,
  label: `${new Date(record.date).toLocaleDateString().replace("/2023", "")}: ${
    record.volume
  } BCF to ${record.destination}`,
}));

const pointsData = TERMINALS.map((record, i) => ({
  lat: record.latitude + Math.random() / 10,
  lng: record.longitude + Math.random() / 10,
  bcfd: record.bcfd / 10,
  color: STATUS_COLORS[record.status],
  label: record.key,
}));

// console.log(arcsData);

export default function ThreeD() {
  const globeMethods = useRef<GlobeMethods | undefined>(undefined);
  return (
    <>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        arcsData={arcsData}
        arcLabel="label"
        arcStroke="stroke"
        // arcColor={"color"}
        // arcDashLength={() => Math.random()}
        // arcDashGap={() => Math.random()}
        // arcDashAnimateTime={() => Math.random() * 4000 + 500}
        pointsData={pointsData}
        pointAltitude="bcfd"
        pointColor="color"
        pointLabel="label"
        pointRadius={0.25}
        ref={globeMethods}
        onGlobeReady={() => {
          console.log("globe");
          globeMethods.current?.pointOfView({ lat: LAT, lng: LNG });
        }}
      />
      <h1 className="absolute left-12 top-12 text-2xl font-bold text-white">
        Natural gas exports from Cove Point, MD in 2023
      </h1>
      <div
        className="absolute bottom-12 left-12 flex flex-col gap-2"
        aria-hidden
      >
        <h2 className="mb-0 text-xs font-bold uppercase tracking-widest text-white">
          Export terminal colors
        </h2>
        <dl>
          {Object.keys(STATUS_COLORS)
            .reverse()
            .map((status, i) => (
              <div
                key={status}
                className={`mt-1 flex items-center justify-start gap-2 text-xs text-white/70`}
              >
                <div
                  className={`h-3 w-3 rounded-full`}
                  style={{
                    backgroundColor:
                      STATUS_COLORS[status as keyof typeof STATUS_COLORS],
                  }}
                />
                <dd className="capitalize">{status.replace("-", " ")}</dd>
              </div>
            ))}
        </dl>
      </div>
    </>
  );
}
