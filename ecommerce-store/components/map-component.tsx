"use client";

import { useState, useEffect, useMemo } from 'react';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, StoreIcon } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

import { Store } from '@/types';

type StoreWithCoords = Store & {
    coords: { lat: number; lng: number };
};

const MapComponent = ({ stores }: { stores: Store[] }) => {
    const storeLinkPrefix = "/store/";

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

    const customMarkerIcon = useMemo(
        () =>
            L.divIcon({
                className: 'custom-marker-icon',
                html: renderToStaticMarkup(<MapPin color="red" size={32} />),
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32],
            }),
        []
    );

    return (
        <div className="mt-4 mx-4">
            <MapContainer
                center={[43.7, -79.4]}
                zoom={7}
                className="rounded-lg"
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
                        <Popup className="text-center">
                            <a href={`${storeLinkPrefix}${store.id}`} className='flex flex-row items-center gap-2 justify-center underline text-[#f89114]'>
                                <StoreIcon />
                                {store.name.toUpperCase()}
                            </a>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
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
