"use client";

import { Card } from "@/components/Card";
import { DotsThreeVertical } from "@/utils/icons"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    return (
        <section className="flex flex-1 pt-2"> 
            <section className="pl-5 w-full">
                <h3 className="font-bold mb-4">Últimas postagens</h3>

                <Card.Root onClick={() => {
                    router.push("/community/post/1");
                }}
                    className="hover:cursor-pointer"
                >
                    <Card.Header className="gap-4">
                        <Image src="https://via.placeholder.com/32x32" className="rounded-full" alt="32x32" width={32} height={32}/>
                        <div>
                            <h2 className="font-bold">Titulo</h2>
                            <span>Por: Fulano</span>
                        </div>

                        {/* <button className="ml-auto">
                            <DotsThreeVertical size={26} />
                        </button> */}
                    </Card.Header>

                    <Card.Content>
                        <h4 className="font-bold">Nome da ONG</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac orci molestie ligula gravida efficitur in eget justo.</p>
                        <span>Assunto</span>
                    </Card.Content>

                    <Card.Footer>
                        <span className="bg-zinc-200 px-2 py-1 rounded-sm">Texto</span>
                    </Card.Footer>
                </Card.Root>
            </section>
        </section>
    )
}