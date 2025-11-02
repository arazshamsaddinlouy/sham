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
  const [marker, setMarker] = useState<any>(null); // ⬅️ Single marker reference

  const isArray = Array.isArray(initialLatLng);

  const getMarkerColor = (point: LatLng, lowestPrice: number | null) => {
    if (point.price == null) return "#00F955"; // Green for no price
    if (lowestPrice != null && point.price === lowestPrice) return "#00F955";
    return "#FF0000";
  };

  const renderMarkers = (mapInstance: any) => {
    if (marker) {
      marker.remove(); // Remove previous marker if exists
    }

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

        const newMarker = new nmp_mapboxgl.Marker({
          color: getMarkerColor(point, lowestPrice),
        })
          .setLngLat([point.lng, point.lat])
          .setPopup(popup)
          .addTo(mapInstance);

        bounds.extend(new nmp_mapboxgl.LngLat(point.lng, point.lat));
        setMarker(newMarker);
      });

      if (latLngArray.length > 1) {
        const lats = latLngArray.map((p) => p.lat);
        const lngs = latLngArray.map((p) => p.lng);

        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);

        const centerLat = (minLat + maxLat) / 2;
        const centerLng = (minLng + maxLng) / 2;

        mapInstance.setCenter([centerLng, centerLat]);
        mapInstance.setZoom(13);
      }
    } else if (
      (initialLatLng as { lat: number | null; lng: number | null })?.lat &&
      (initialLatLng as { lat: number | null; lng: number | null })?.lng
    ) {
      const { lat, lng } = initialLatLng as { lat: number; lng: number };
      const popup = new nmp_mapboxgl.Popup({ offset: 25 }).setText(
        "با نگه داشتن مارکر می‌توانید آن را روی نقشه جابه‌جا کنید"
      );

      const newMarker = new nmp_mapboxgl.Marker({
        color: "#00F955",
        draggable: !!isDraggable,
      })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(mapInstance)
        .togglePopup();

      if (isDraggable) {
        newMarker.on("dragend", (e: any) => {
          const lngLat = e.target.getLngLat();
          handleLatLngChange?.(lngLat.lat, lngLat.lng);
        });
      }

      mapInstance.setCenter([lng, lat]);
      setMarker(newMarker);
    }
  };

  const mapSetter = (neshanMap: any) => {
    setMap(neshanMap);
    renderMarkers(neshanMap);
  };

  // Re-render marker on data or map updates
  useEffect(() => {
    if (map) {
      renderMarkers(map);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLatLng, map, location, isDraggable]);

  // Handle map clicks for marker relocation (only if draggable)
  useEffect(() => {
    if (!map || !isDraggable || !marker) return;

    const handleClick = (e: any) => {
      const { lng, lat } = e.lngLat;

      marker.setLngLat([lng, lat]);

      handleLatLngChange?.(lat, lng);
    };

    map.on("click", handleClick);
    return () => {
      map.off("click", handleClick);
    };
  }, [map, marker, isDraggable, handleLatLngChange]);

  const center = isArray ? (initialLatLng as LatLng[])[0] : initialLatLng;

  return (
    center?.lat !== null &&
    center?.lng !== null && (
      <div className="h-[400px] mt-[30px]">
        <MComponent
          options={{
            mapKey: "web.8d3c1ec0100543bba908b6367985d91a",
            mapType: MapTypes.neshanRaster,
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
