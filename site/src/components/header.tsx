"use client";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

export function Header() {
    const pathname = usePathname();

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

    console.log(pathname)
    return (
        <header className="flex flex-1 justify-between items-center px-12 py-5">
            <Link href="./" className="font-bold text-2xl">Ajudai_</Link>
            <nav className="">
                <ul className="flex gap-10">
                    {
                        menu.map((item, index) => (
                            <li key={index} className={twMerge("relative after:bg-zinc-500 after:absolute after:opacity-0 after:w-0 after:h-[2px] after:transition-all after:duration-150 after:left-0 after:bottom-0 hover:after:opacity-100 hover:after:w-full", pathname == item.url && " after:w-full after:opacity-100")}>
                                <Link href={item.url}>{item.label}</Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>

            <Button label="Entrar" />
        </header>
    )
}