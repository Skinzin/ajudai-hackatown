import Image from "next/image";
import { SignInClient } from "./page.client";
import { Metadata } from "next";


const metadata: Metadata = {
    title: "Entrar | Ajuda aí",
    description: "Faça login na sua conta Ajuda aí",
}

export default function Page() {
    return (
        <main className="flex h-full">
            <div className="w-2/4">
                <Image src="/mercado.svg" alt="Um rapaz fazendo compras no mercado" width={453} height={453} className="w-full h-full object-cover"/>
            </div>

            <SignInClient />
        </main>
    )
}