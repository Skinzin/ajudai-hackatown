"use client";
import { Button } from "@/components/button";
import { LabelFloat } from "@/components/labelFloat";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormOrganizationData, schemaFormLoginOrganization } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShortHeader } from "@/components/ShortHeader";
import { useRouter } from "next/navigation";

export function SignInClient() {
    const router = useRouter();
    const {
        register,
        clearErrors,
        handleSubmit,
        formState: { errors, isLoading },
        watch
    } = useForm<Pick<FormOrganizationData, "email" | "password">>({
        resolver: zodResolver(schemaFormLoginOrganization),
        mode: "onChange"
    });

    function onSubmit(data: Pick<FormOrganizationData, "email" | "password">) {
        

        if(data.email && data.password) {
            router.push("/perfil");
        }
    }

    return (
        <div className="flex flex-col items-center w-2/4 px-16 py-12 border-l-1 border-zinc-200">
            <ShortHeader />
            
            <section className="w-full my-auto">
                <h1 className="font-bold text-6xl mb-5">Olá de novo!</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
                    <LabelFloat label="E-mail" name="email" className="max-w-full" register={register("email")} error={errors.email?.message}/>
                    <LabelFloat type="password" label="Senha" name="password" className="max-w-full" register={register("password")} error={errors.password?.message}/>

                    <Button label="Entrar" className="mt-4 w-full" disabled={!watch("email") || !watch("password") || isLoading || !!errors.email || !!errors.password}/>
                    <Link href="/ngo-signup" className="underline text-sm text-center mt-2">Ainda não tem conta? Se cadastre aqui</Link>
                </form>
            </section>
        </div>
    )
}