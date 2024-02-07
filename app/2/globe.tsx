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
  );
}
