import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Sobre nós | Ajuda aí",
    description: "Generated by create next app",
};

export default function Page() {
    return (
        <main>
            <section className="flex items-center px-36 py-12 gap-12 max-w-7xl w-full mx-auto">
                <div>
                    <h1 className="font-bold text-4xl">Sobre nós</h1>
                    <p className="mt-2">O Ajuda aí é uma plataforma projetada para facilitar a troca e doação de itens como mantimentos e móveis para pessoas afetadas por desastres naturais. Além de possibilitar essas doações, também conecta comunidades em necessidade com voluntários prontos para ajudar.</p>
                </div>
                <Image src="/Criancas.svg" alt="Dois meninos fazendo caretas" width={453} height={453}/>
            </section>

            <section className="bg-zinc-200 px-36 py-12">
                <div className="flex justify-center items-center gap-14 max-w-7xl w-full mx-auto">
                    <Image src="foto_mesa_alimentos.svg" alt="Uma mesa replata de alimentos" width={453} height={453}/>

                    <div>
                        <h2 className="font-bold text-4xl">Por que se juntar ao Ajudai?</h2>
                        <p className="mt-2">Amplie Seu Alcance: Trabalhe conosco para atingir mais comunidades e expandir o alcance das suas iniciativas de ajuda.
                        <br />Compartilhe Recursos e Conhecimento: Combine esforços e aproveite a experiência e os recursos de nossa plataforma para otimizar o suporte oferecido.
                        <br />Fortaleça a Rede de Solidariedade: Construa parcerias significativas e fortaleça a rede de apoio para uma resposta mais eficaz a desastres..</p>
                    </div>
                </div>
            </section>

            <section className="flex items-center px-36 py-12 gap-12 max-w-7xl w-full mx-auto">
                <div>
                    <h1 className="font-bold text-4xl">O que oferecemos</h1>
                    <p className="mt-2">Integração na Plataforma: Sua ONG pode se integrar ao Ajudai para listar suas necessidades e oferecer suas doações e serviços diretamente aos beneficiários.
                    <br />Colaboração em Eventos: Junte-se a nós em campanhas e eventos para promover a conscientização e angariar mais apoio para as comunidades afetadas.
                    <br />Visibilidade e Reconhecimento: Ganhe visibilidade através de nossa plataforma e redes sociais, destacando o trabalho da sua ONG e suas contribuições.</p>
                </div>
                <Image src="/Cachorro.svg" alt="Foto de um cachorro" width={453} height={453}/>
            </section>
        </main>
    )
}