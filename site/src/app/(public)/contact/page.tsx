import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { LabelFloat } from "@/components/labelFloat";
import { LabelFloatTextarea } from "@/components/TextArea";
import { Metadata } from "next";
import Image from "next/image";
import { FormEvent } from "react";
import toast from "react-hot-toast";


export const metadata: Metadata = {
    title: "Contato | Ajuda aí",
}

export default function Page() {

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        toast.success("Mensagem enviada com sucesso!");
    }


    return (
        <main className="flex items-center justify-center gap-14 mx-auto mt-12 max-w-7xl w-full">
            <section className="max-w-xl w-full">
                <h1 className="font-bold text-4xl">Contato</h1>
                <p>Estamos empolgados em convidá-lo a se juntar à nossa comunidade no Ajudai, onde estamos fazendo a diferença juntos!</p>

                <Form onSubmit={handleSubmit} className="w-full">
                    <LabelFloat 
                        label="Seu nome"
                        name="name"
                        className="max-w-full"
                    />
                    <LabelFloat 
                        type="email"
                        label="E-mail"
                        name="email"
                        className="max-w-full"
                    />
                    <LabelFloatTextarea 
                        label="Assunto"
                        name="subject"
                        className="max-w-full"
                    />

                    <Button label="Enviar" className="w-full" />
                </Form>
            </section>
            <div>
                <Image src="/Foto_contato.svg" alt="Mulher mulher entrando em conversando ao telefone enfrente a um notebook" width={453} height={453} />
            </div>
        </main>
    )
}