"use client";

import { CircleLoading } from "@/components/CircleLoding";
import { LabelFloat } from "@/components/labelFloat";
import api from "@/services/api";
import { PaperPlane, PaperPlaneRight } from "@/utils/icons"
import Image from "next/image";
import { useState } from "react";

export default function Page() {
    const [comment, setComment] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        api.post('/comment', {})
    }

    return (
        <section className="flex flex-col flex-1 pt-2 overflow-auto">

            <section className="">
                <div className="flex items-center gap-4">
                    <Image src="https://via.placeholder.com/32x32" className="rounded-full" alt="32x32" width={32} height={32}/>
                    <div>
                        <h2 className="font-bold">Titulo</h2>
                        <span>Por: Fulano</span>
                    </div>
                </div>

                <h3 className="font-bold text-base py-2">Nome da ONG</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac orci molestie ligula gravida efficitur in eget justo. Donec suscipit nisi sit amet ligula feugiat, eu cursus erat efficitur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac orci molestie ligula gravida efficitur in eget justo. Donec suscipit nisi sit amet ligula feugiat, eu cursus erat efficitur.</p>
            
                <div className="bg-pelorous-600 text-white px-4 py-1 w-fit rounded-full">
                    <p className="text-sm">Assunto</p>
                </div>
            </section>


            <hr className="w-full my-4 h-1" />

            <section>
                <h3 className="font-bold text-base">Comentar</h3>
                <form>
                    <LabelFloat 
                        name="comment"
                        label="Comentário"
                        className="max-w-full"
                        rightAction={() => 
                            <button
                                disabled={!comment || isLoading}
                            >
                                {
                                    isLoading ? <CircleLoading /> : <PaperPlane />
                                }
                            </button>
                        }
                    />
                </form>
            </section>

            <section className="flex flex-col gap-6 mt-4">
                <div className="">
                    <div className="flex items-center gap-4">
                        <Image src="https://via.placeholder.com/32x32" className="rounded-full" alt="32x32" width={32} height={32}/>
                        <div className="flex items-center">
                            <h2 className="font-bold">Titulo</h2>
                            <p>• Há 1h</p>
                            <p>• Editado</p>
                        </div>
                    </div>

                    <h3 className="font-bold text-base py-2">Nome da ONG</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac orci molestie ligula gravida efficitur in eget justo. Donec suscipit nisi sit amet ligula feugiat, eu cursus erat efficitur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac orci molestie ligula gravida efficitur in eget justo. Donec suscipit nisi sit amet ligula feugiat, eu cursus erat efficitur.</p>
                </div>
            </section>
        </section>
    )
}