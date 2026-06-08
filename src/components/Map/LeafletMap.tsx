"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LocateFixed } from "lucide-react";

const getMarkerIcon = (category: string) => {
    let emoji = "📍";
    let colorClass = "bg-primary text-white";

    switch (category) {
        case "food":
            emoji = "🍽";
            colorClass = "bg-orange-500 text-white";
            break;
        case "parks":
            emoji = "🌿";
            colorClass = "bg-green-500 text-white";
            break;
        case "emergency":
            emoji = "🏥";
            colorClass = "bg-red-500 text-white";
            break;
        case "attractions":
            emoji = "📍";
            colorClass = "bg-primary text-white"; // бирюзовый (primary theme color)
            break;
    }

    return new L.DivIcon({
        className: "custom-leaflet-icon",
        html: `<div class="w-8 h-8 rounded-full ${colorClass} flex items-center justify-center shadow-md shadow-black/20 text-sm border-2 border-white">${emoji}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });
};

// Custom Geolocation Control Component
function LocationMarker() {
    const [position, setPosition] = useState<L.LatLng | null>(null);
    const map = useMap();

    const handleLocate = () => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        }).on("locationerror", function () {
            // Trying to translate via window.navigator.language or assume default. 
            // For simplicity, we just use a multiple language string or rely on external toast
            alert("RU: Включите геолокацию в настройках браузера\nEN: Please enable location in browser settings\nKY: Браузер жөндөөлөрүндө жайгашкан жерди иштетиңиз");
        });
    };

    return (
        <>
            <div className="leaflet-bottom leaflet-right mb-6 mr-6" style={{ zIndex: 1000, position: "absolute", bottom: "20px", right: "20px" }}>
                <button
                    onClick={handleLocate}
                    className="w-12 h-12 bg-white rounded-full shadow-lg border border-primary/20 flex items-center justify-center text-primary hover:bg-secondary transition-colors"
                    title="My Location"
                >
                    <LocateFixed size={24} />
                </button>
            </div>

            {position && (
                <Marker
                    position={position}
                    icon={new L.DivIcon({
                        className: "user-location-marker",
                        html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse"></div>`,
                        iconSize: [16, 16],
                        iconAnchor: [8, 8]
                    })}
                >
                    <Popup>You are here</Popup>
                </Marker>
            )}
        </>
    );
}

interface LeafletMapProps {
    places: any[];
    filter: string;
}

export default function LeafletMap({ places, filter }: LeafletMapProps) {
    const filteredPlaces = filter === "all" ? places : places.filter((p) => p.category === filter);

    return (
        <div className="w-full h-[300px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white relative z-0">
            <MapContainer
                center={[42.8746, 74.5698]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {filteredPlaces.map((place) => (
                    <Marker
                        key={place.id}
                        position={[place.lat, place.lng]}
                        icon={getMarkerIcon(place.category)}
                    >
                        <Popup className="custom-popup">
                            <div className="p-1 min-w-[180px]">
                                <div className="mb-2">
                                    <span className={`inline-block px-2 py-1 text-[10px] uppercase font-bold text-white rounded-full mb-1 ${place.category === 'food' ? 'bg-orange-500' :
                                            place.category === 'parks' ? 'bg-green-500' :
                                                place.category === 'emergency' ? 'bg-red-500' : 'bg-primary'
                                        }`}>
                                        {place.category}
                                    </span>
                                    <h3 className="font-bold text-primary text-base leading-tight">{place.name}</h3>
                                </div>
                                <p className="text-xs text-gray-600 mb-3">{place.desc}</p>

                                <div className="space-y-1 mb-4">
                                    {place.hours && (
                                        <div className="flex items-center text-xs text-gray-500">
                                            <span className="mr-2">🕐</span> {place.hours}
                                        </div>
                                    )}
                                    {place.phone && (
                                        <div className="flex items-center text-xs text-gray-500">
                                            <span className="mr-2">📞</span> {place.phone}
                                        </div>
                                    )}
                                </div>

                                <a
                                    href={`https://maps.google.com/maps?daddr=${place.lat},${place.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-2 bg-primary text-white text-center text-xs font-bold rounded-xl hover:bg-primary/90 transition-colors"
                                >
                                    Построить маршрут
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                <LocationMarker />
            </MapContainer>
        </div>
    );
}
