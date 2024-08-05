"use client";
import { MapContainer, MapContainerProps, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import mapIcon from "@/utils/mapIcon";
import { twMerge } from "tailwind-merge";


interface MapProps extends MapContainerProps {
    position: { latitude: number, longitude: number },
    locationsMaker?: { latitude: number, longitude: number }[],
    children?: React.ReactNode
}

export function Map({ position, children, locationsMaker, className, ...rest }: MapProps) {
    
    return (
        <MapContainer
            center={[position.latitude, position.longitude]}
            zoom={rest.zoom}
            className={twMerge("w-full flex-1 border-t-1 border-l-1 border-zinc-300 rounded-tl-lg", className)}
            {...rest}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                locationsMaker?.map((location, index) => (
                    <Marker 
                        key={index}
                        position={[location.latitude, location.longitude]}
                        icon={mapIcon}
                    >
                        {children}
                    </Marker>
                ))
            }
        </MapContainer>
    );
}