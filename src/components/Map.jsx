import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import ChangeView from "./ChangeView";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [2, -40],
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map(props) {
  const { mapCoordinates } = props;

  if (!mapCoordinates) {
    return null;
  }

  const { lngLat, zoom } = mapCoordinates;

  return (
    <div>
      <MapContainer
        className="map-section"
        center={lngLat}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <ChangeView center={lngLat} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[59.4231, 24.7991]}>
          <Popup>
            Ülemiste keskus. <br /> Avatud 9-20
          </Popup>
        </Marker>
        <Marker position={[59.4277, 24.7193]}>
          <Popup>
            Kristiine keskus. <br /> Avatud 10-21
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
