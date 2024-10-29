"use client";

import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

import { Store } from '@/types';

// Define a type for stores with non-null coords
type StoreWithCoords = Store & {
    coords: { lat: number; lng: number };
};

const MapComponent = ({ stores }: { stores: Store[] }) => {
    const [storeLocations, setStoreLocations] = useState<StoreWithCoords[]>([]);

    useEffect(() => {
        const fetchCoordinates = async () => {
            const locations = await Promise.all(
                stores.map(async (store) => {
                    const coords = await geocodeLocation(store.location);
                    return { ...store, coords };
                })
            );

            const storesWithCoords = locations.filter(
                (store): store is StoreWithCoords => store.coords !== null
            );

            setStoreLocations(storesWithCoords);
        };
        fetchCoordinates();
    }, [stores]);

    // Memoize the custom icon to improve performance
    const customMarkerIcon = useMemo(
        () =>
            L.divIcon({
                className: 'custom-marker-icon',
                html: renderToStaticMarkup(<MapPin color="red" size={32} />),
                iconSize: [32, 32],
                iconAnchor: [16, 32], // Adjust anchor to the bottom center
                popupAnchor: [0, -32], // Adjust popup position
            }),
        []
    );

    return (
        <MapContainer
            center={[43.7, -79.4]}  // Centered on Canada
            zoom={7}
            style={{ height: '500px', width: '100%' }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {storeLocations.map((store) => (
                <Marker
                    key={store.id}
                    position={[store.coords.lat, store.coords.lng]}
                    icon={customMarkerIcon}
                >
                    <Popup>{store.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;

// Helper function to geocode the location string
const geocodeLocation = async (
    location: string
): Promise<{ lat: number; lng: number } | null> => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                location
            )}&format=json&limit=1`
        );
        const data = await response.json();
        if (data && data.length > 0) {
            return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        } else {
            console.error(`No results found for location: ${location}`);
            return null;
        }
    } catch (error) {
        console.error(`Error geocoding location ${location}:`, error);
        return null;
    }
};
