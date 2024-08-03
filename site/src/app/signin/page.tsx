"use client";

import { Button } from "@/components/button";
import { LabelFloat } from "@/components/labelFloat";
import Link from "next/link";


export default function Page() {

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
    }

    return (
        <main>
            <></>

            <section>
                <h1>Olá de novo!</h1>

                <form onSubmit={handleSubmit}>
                    <LabelFloat label="E-mail" name="email" />
                    <LabelFloat type="password" label="Senha" name="password" />

                    <Button label="Entrar" className="mt-2 w-full"/>
                    <Link href="/ngo-signup" className="underline text-sm">Ainda não tem conta? Se cadastre aqui</Link>
                </form>
            </section>
        </main>
    )
}