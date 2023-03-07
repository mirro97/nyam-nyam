import { useRef, useState } from "react";

const MapMarker = () => {
  const markerRef = useRef<HTMLElement | null | any>(null);
  const [curLocation, setCurLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");
  return <div></div>;
};

export default MapMarker;
