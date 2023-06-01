import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2FtYmxlcmVzdCIsImEiOiJjbGk2bDVpeTMzZDBtM2Rtd3kwZ3U3NHgyIn0.xQMysKgnbwsf38qhi0tF6g";

export default function MapComponent() {
  useEffect(() => {
    const center = {
      lat: 58.3868916,
      lng: 24.5030502,
    };
    const zoom = 11;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [center.lng, center.lat],
      zoom: zoom,
    });

    return () => map.remove();
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }}></div>;
}
