"use client";
import { Button } from "@/components/button";
import { Checkbox } from "@/components/Checkbox";
import { LabelFloat } from "@/components/labelFloat";
import { Loading } from "@/components/loading";
import { Map } from "@/components/Map";
import { Profile } from "@/components/profile";
import { Select } from "@/components/select";
import { MapPin } from "@/utils/icons"
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    const [address, setAddress] = useState('');
    const [zoom, setZoom] = useState(12);
    

    function getCurrentPosition() {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            setPosition({ latitude, longitude });

            await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                .then((response) => {
                    console.log(response.data);
                })
                .finally(() => setIsLoading(false));
        }, (error) => {
            console.log(error);
        });
    }



    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const response = await axios.get(`/api/geocode`, {
            params: {
                address: event.currentTarget.address.value
            }
        });

        if(response.data.error || response.data.status === 'ZERO_RESULTS' || response.data.results.length <= 0) {
            console.error(response.data.error);
            toast.error('Erro ao buscar endereço');
            return setIsLoading(false);
        }

        console.log(response.data);

        const { lat, lng } = response.data.results[0].geometry.location;

        setPosition({ latitude: lat, longitude: lng });
        setZoom(17)
    }

    useEffect(() => {
        getCurrentPosition();
    }, [])

    return (
        <main className="flex h-full">
            <aside className="flex flex-col justify-center items-center px-7 py-5 bg-white max-w-96">
                <h2 className="font-bold text-2xl">Encontre uma ONG perto de você</h2>
                <p>Informe sua localização e encontre ONGS perto de você!</p>

                <form onSubmit={handleSubmit} className="w-full">
                    <LabelFloat 
                        label="Endereço"
                        name="address"
                        className="w-full"
                        rightAction={() => (
                            <button type="button" className="absolute right-1 top-0 bottom-0 text-zinc-600">
                                <MapPin size={22} className="text-2xl bg-white p-1" />
                            </button>
                        )}
                        onChange={(event) => {
                            setAddress(event.currentTarget.value);
                            console.log(event.currentTarget.value);
                        }}
                        value={address}
                    />

                    <Select className="mt-2" label="Doar item" options={[
                        { value: '0', label: 'Doar item'},
                        { value: '1', label: 'Item 1'   },
                        { value: '2', label: 'Item 2'   },
                        { value: '3', label: 'Item 3'   },
                    ]}></Select>

                    <div className="mt-2">
                        <h3 className="font-bold text-lg mt-2">Filtros</h3>
                        <Checkbox id="voluntary" label="Seja voluntário" />
                        <Checkbox id="donations" label="Aceitando doações" />
                        <Checkbox id="recursos" label="Doando recursos" />
                    </div>

                    <Button type="submit" label="Buscar" className="mt-2 w-full" disabled={
                        isLoading || !address
                    } />
                </form>
            </aside>
            {
                isLoading ? <Loading className="m-auto" /> : (
                    <Map
                        position={position}
                        locationsMaker={[position]}
                        zoom={zoom}
                        className="z-0"
                    >
                        <Profile 
                            className="absolute right-0 top-0 z-10"
                        />
                    </Map>
                )
            }
        </main>
    )
}