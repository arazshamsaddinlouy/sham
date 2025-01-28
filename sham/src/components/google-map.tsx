import { useEffect, useRef, useState } from "react";

export default function MapComponent() {
  const [map, setMap] = useState<google.maps.Map>();
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: { lat: 4.4333479181711075, lng: -75.21505129646759 },
          zoom: 10,
        })
      );
    }
  }, [map]);
  return (
    <>
      <div
        ref={ref as any}
        style={{ height: "180px", width: "100%", minHeight: "700px" }}
      ></div>
    </>
  );
}
