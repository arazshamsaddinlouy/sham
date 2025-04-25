import { useEffect, useState } from "react";
import {
  MapComponent as MComponent,
  MapTypes,
} from "@neshan-maps-platform/mapbox-gl-react";
import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";
import "@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css";
import { useLocation } from "react-router-dom";

type LatLng = {
  lat: number;
  lng: number;
  price?: number;
};

export default function MapComponent({
  initialLatLng,
  handleLatLngChange,
  isDraggable = true,
}: {
  initialLatLng: { lat: number | null; lng: number | null } | LatLng[];
  handleLatLngChange?: Function;
  isDraggable?: boolean;
}) {
  const location = useLocation();
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  const isArray = Array.isArray(initialLatLng);

  const getMarkerColor = (point: LatLng, lowestPrice: number | null) => {
    if (point.price == null) return "#00F955"; // Green for no price
    if (lowestPrice != null && point.price === lowestPrice) return "#00F955"; // Green for lowest
    return "#FF0000"; // Red for other prices
  };

  const renderMarkers = (mapInstance: any) => {
    markers.forEach((m) => m.remove());
    const newMarkers: any[] = [];

    const latLngArray = isArray ? (initialLatLng as LatLng[]) : [];
    const prices = latLngArray
      .map((p) => p.price)
      .filter((p) => p != null) as number[];
    const lowestPrice = prices.length ? Math.min(...prices) : null;

    if (isArray && latLngArray.length > 0) {
      const bounds = new nmp_mapboxgl.LngLatBounds();

      latLngArray.forEach((point) => {
        const popupText =
          point.price != null
            ? `قیمت پیشنهادی : ${point.price.toLocaleString()} ریال`
            : "با نگه داشتن مارکر می‌توانید آن را روی نقشه جابه‌جا کنید";

        const popup = new nmp_mapboxgl.Popup({ offset: 25 }).setText(popupText);

        const marker = new nmp_mapboxgl.Marker({
          color: getMarkerColor(point, lowestPrice),
        })
          .setLngLat([point.lng, point.lat])
          .setPopup(popup)
          .addTo(mapInstance);

        newMarkers.push(marker);
        // ✅ This works with Neshan
        bounds.extend(new nmp_mapboxgl.LngLat(point.lng, point.lat));
        if (latLngArray.length > 1) {
          const lats = latLngArray.map((p) => p.lat);
          const lngs = latLngArray.map((p) => p.lng);

          const minLat = Math.min(...lats);
          const maxLat = Math.max(...lats);
          const minLng = Math.min(...lngs);
          const maxLng = Math.max(...lngs);

          const centerLat = (minLat + maxLat) / 2;
          const centerLng = (minLng + maxLng) / 2;

          // Set map center
          mapInstance.setCenter([centerLng, centerLat]);

          // Optional: adjust zoom manually (or dynamically if you want to calculate distance)
          mapInstance.setZoom(13); // or 8–12 based on spread
        }
      });
    } else if (
      (initialLatLng as { lat: number | null; lng: number | null })?.lat &&
      (initialLatLng as { lat: number | null; lng: number | null })?.lng
    ) {
      const { lat, lng } = initialLatLng as { lat: number; lng: number };
      const popup = new nmp_mapboxgl.Popup({ offset: 25 }).setText(
        "با نگه داشتن مارکر می‌توانید آن را روی نقشه جابه‌جا کنید"
      );
      const marker = new nmp_mapboxgl.Marker({
        color: "#00F955",
        draggable: !!isDraggable,
      })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(mapInstance)
        .togglePopup();

      if (isDraggable) {
        marker.on("dragend", (e: any) => {
          if (handleLatLngChange) {
            const lngLat = e.target.getLngLat();
            handleLatLngChange(lngLat.lat, lngLat.lng);
          }
        });
      }

      newMarkers.push(marker);
      mapInstance.setCenter([lng, lat]);
    }

    setMarkers(newMarkers);
  };

  const mapSetter = (neshanMap: any) => {
    setMap(neshanMap);
    renderMarkers(neshanMap);
  };

  useEffect(() => {
    if (map) {
      renderMarkers(map);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLatLng, map, location, isDraggable]);

  const center = isArray ? (initialLatLng as LatLng[])[0] : initialLatLng;

  return (
    center?.lat !== null &&
    center?.lng !== null && (
      <div className="h-[400px] mt-[30px]">
        <MComponent
          options={{
            mapKey: "web.8d3c1ec0100543bba908b6367985d91a",
            mapType: MapTypes.neshanRasterNight,
            zoom: 16,
            center: [center.lng, center.lat],
          }}
          className="h-[400px]"
          mapSetter={mapSetter}
        />
      </div>
    )
  );
}
