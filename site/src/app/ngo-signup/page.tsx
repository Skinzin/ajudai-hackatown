"use client";
import { Button } from "@/components/button";
import { LabelFloat } from "@/components/labelFloat";
import { LabelFloatTextarea } from "@/components/TextArea";
import { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


// export const metadata: Metadata = {
//     title: "Registro de ONG | Ajudai_",
//     description: "Participe da nossa comunidade, se inscreva",
// }

export default function Page() {
    const [ngo, setNgo] = useState({
        name: '',
        email: '',
        password: '',
        atuation: '',
        about: '',
    });
    const router = useRouter();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // console.log('submit'); 
    }


    return (
        <main className="px-36 py-12">
            <h1 className="font-bold text-4xl">Participe da nossa<br /> comunidade, se inscreva</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac orci molestie ligula gravida efficitur in eget justo.</p>

            <form onSubmit={handleSubmit}>
                <LabelFloat label="Nome" name="name" />
                <LabelFloatTextarea label="Descrição" name="about" />
                {/* <LabelFloat label="Descrição" name="about" /> */}
                <LabelFloat label="E-mail" name="email" />
                <LabelFloat type="password" label="Senha" name="password" />

                <div>
                    <Button label="Cadastrar" className="w-full mt-2" />
                    <Link href="/signin" className="underline text-sm">Já tem uma conta? Entre aqui</Link>
                </div>
            </form>
        </main>
    )
}