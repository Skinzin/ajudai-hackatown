"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./button";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import Image from "next/image";


export function Header({ className }: Readonly<{ className?: string }>) {
    const pathname = usePathname();
    const router = useRouter();

    const menu = [
        {
            label: "Inicio",
            url: "/"
        },
        {
            label: "Ajude uma ONG",
            url: "/help-ong"
        },
        {
            label: "Contato",
            url: "/contact"
        },
        {
            label: "Sobre nós",
            url: "/about"
        },
    ];


    return (
        <header className={twMerge("px-12 py-5", className)}>
            <div className="flex justify-between items-center max-w-7xl w-full mx-auto">
                <Link href="./" className="font-bold text-2xl">
                    <Image src="/logo.svg" alt="Logo roxo da ajuda aí" width={150} height={50} />
                </Link>
                <nav className="">
                    <ul className="flex gap-10">
                        {
                            menu.map((item, index) => (
                                <li key={index} className={twMerge("relative after:bg-affair-500 after:absolute after:opacity-0 after:w-0 after:h-[2px] after:transition-all after:duration-150 after:left-0 after:bottom-0 hover:text-affair-500 hover:after:opacity-100 hover:after:w-full", pathname == item.url && " after:w-full after:opacity-100 text-affair-500")}>
                                    <Link href={item.url}>{item.label}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <div className="flex items-center gap-4">
                    <Link className="px-5 py-2 bg-pelorous-600 text-white rounded-md" href="/signup">Inscreva-se</Link>
                    <Link className="px-5 py-2 bg-affair-600 text-white rounded-md" href="/signin">Entrar</Link>
                </div>
            </div>
        </header>
    )
}