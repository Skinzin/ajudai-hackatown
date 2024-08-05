import Image from "next/image";
import React from "react"
import { twMerge } from "tailwind-merge";

import { InstagramLogo, WhatsappLogo } from "@/utils/icons";
import { Card } from "./Card";

interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
    // children: React.ReactNode;
    name?: string;
    about?: string;
    location?: string;
    acceptVolunteer?: boolean;
    acceptDonations?: boolean;
}

export function Profile({ className, ...rest }: ProfileProps) {
    return (
        <section className={twMerge("bg-white rounded-2xl px-2 py-5", className)}>
            <div>
                <Image src="https://via.placeholder.com/32x32" className="rounded-full" alt="32x32" width={32} height={32}/>
                <h2>Ajuda aí</h2>

                <div>
                    <WhatsappLogo />
                    <InstagramLogo />
                </div>
            </div>

            <h3>Sobre</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac orci molestie ligula gravida efficitur in eget justo. Donec suscipit nisi sit amet ligula feugiat, eu cursus erat efficitur.</p>

            <div>

                <p>Essa ONG aceita voluntários</p>
            </div>

            <h3>Localização</h3>
            <p>Endereço</p>

            <h3>Aceitamos doações</h3>
            <Card.Root>
                <Card.Content>
                    <Image src="https://via.placeholder.com/32x32" className="rounded-full" alt="32x32" width={32} height={32}/>
                    <h4>Nome do item</h4>
                    <p>Quantidade</p>
                </Card.Content>
            </Card.Root>

            <h3>Estamos doando</h3>
            <Card.Root>
                <Card.Content>
                    <Image src="https://via.placeholder.com/32x32" className="rounded-full" alt="32x32" width={32} height={32}/>
                    <h4>Nome do item</h4>
                    <p>Quantidade</p>
                </Card.Content>
            </Card.Root>
        </section>
    )
}