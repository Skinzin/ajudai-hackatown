"use client"; 
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export function Footer({ className }: { className?: string }) {
    return (
        <footer className={twMerge("", className)}>
            <Image src="ondulacao_footer.svg" alt="a" width={100} height={100} className="w-full h-full" />
        </footer>
    )
}