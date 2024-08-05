"use client";
import { CaretLeft } from "@/utils/icons"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ShortHeader() {
    const router = useRouter();

    return (
        <header className="flex items-center justify-between w-full">
            <button className="flex items-center gap-2" onClick={() => router.back()}>
                <CaretLeft />
                <span>Voltar</span>
            </button>
            
            <Link href="/">
                <Image src="/logo.svg" alt="Logo roxa da Ajuda ai" width={142} height={35}/>
            </Link>
        </header>
    )
}