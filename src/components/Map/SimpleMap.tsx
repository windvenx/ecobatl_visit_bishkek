"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.DivIcon({
    className: "custom-leaflet-icon",
    html: `<div class="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center shadow-md border-2 border-white">📍</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
});

export default function SimpleMap({ center, zoom }: { center: [number, number]; zoom: number }) {
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
            dragging={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center} icon={customIcon} />
        </MapContainer>
    );
}
