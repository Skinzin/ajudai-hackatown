"use client";
import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { LabelFloat } from "@/components/labelFloat";
import { LabelFloatTextarea } from "@/components/TextArea";
import { FormOrganizationData, schemaFormOrganization } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Eyes, EyeSlash } from "@/utils/icons";
import axios from "axios";
import { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { OrganizationProps } from "@/@types/organization";
import api from "@/services/api";
import toast from "react-hot-toast";
import { Header } from "@/components/header";
import Image from "next/image";


export default function Page() {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
        watch,
        reset,
        clearErrors,
        setValue,
    } = useForm<FormOrganizationData>({
        resolver: zodResolver(schemaFormOrganization),
        mode: "onChange"
    });

    async function onSubmit(data: FormOrganizationData) {
        const addressString = `${data.address.street}, ${data.address.number} - ${data.address.city}, ${data.address.state}, ${data.address.cep}`;
        const response = await axios.get(`/api/geocode`, {
            params: {
                address: addressString,
            }
        });

        if(response.data.error) {
            console.error(response.data);
            return;
        }

        const organization: FormOrganizationData = {
            ...data,
            address: {
                ...data.address,
                lat: response.data.results[0].geometry.location.lat,
                lng: response.data.results[0].geometry.location.lng,
            }
        }
        
        try {
            api.post<OrganizationProps>('/organization', organization)
                .then((response) => {
                    if(response.status === 201) {
                        toast.success("Cadastro realizado com sucesso!");
                    } else {
                        throw new Error("Erro ao cadastrar ONG");
                    }
                })
                    .catch(error => {
                        console.error(error);
                        throw new Error("Erro ao cadastrar ONG");
                    });
        } catch (error) {
            toast.error("Não foi possível realizar o cadastro");
            console.error(error);
        }
    }

    function handleCep(e: React.ChangeEvent<HTMLInputElement>) {
        const addressStreet = document.getElementById(register('address.street').name);
        const addressCity = document.getElementById(register('address.city').name);
        const addressState = document.getElementById(register('address.state').name);

        if(e.target.value.length === 8) {
            axios.get(`https://viacep.com.br/ws/${e.target.value.replace(/\D/g, '')}/json/`)
                .then(response => {
                    setValue('address.street', response.data.logradouro);
                    setValue('address.city', response.data.localidade);
                    setValue('address.state', response.data.uf);
                    clearErrors('address.street');
                    clearErrors('address.city');
                    clearErrors('address.state');
                    
                    addressStreet?.setAttribute('disabled', 'true');
                    addressCity?.setAttribute('disabled', 'true');
                    addressState?.setAttribute('disabled', 'true');
                });
        } 
    }


    return (
        <>
            <Header />
            <main className=" px-36 py-12">
                <section className="flex justify-between gap-4 max-w-7xl w-full mx-auto">
                    <section className="max-w-2xl">
                        <h1 className="font-bold text-4xl">Participe da nossa<br /> comunidade, se inscreva</h1>
                        <p>Estamos empolgados em convidá-lo a se juntar à nossa comunidade no Ajuda ai, onde estamos fazendo a diferença juntos!.</p>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-4">
                            <LabelFloat label="Nome*" register={register('name')} error={errors.name?.message} className="max-w-full"/>
                            <LabelFloat label="Área de atuação*" register={register('area')} error={errors.area?.message} className="max-w-full"/>
                            <LabelFloatTextarea label="Descrição*" name="about" register={register('about')} error={errors.about?.message} className="max-w-full"/>
                            <LabelFloat label="E-mail*" register={register('email')} error={errors.email?.message} className="max-w-full"/>
                            <LabelFloat type={showPassword ? "text" : "password"} label="Senha*" register={register('password')} error={errors.password?.message} rightAction={() => (
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-0 bottom-0 right-2">
                                    {showPassword ? <Eye className="bg-white" /> : <EyeSlash className="bg-white"/>}
                                </button>
                            )} className="max-w-full"/>
                            <LabelFloat label="Telefone*" register={register('phone')} error={errors.phone?.message} className="max-w-full"/>
                            <LabelFloat label="CEP*" type="number" max={99999999} register={register('address.cep')} error={errors.address?.cep?.message} onChangeCapture={handleCep} onWheel={(e) => e.currentTarget.blur()} className="max-w-full"/>
                            <LabelFloat label="Rua*" register={register('address.street')} error={errors.address?.street?.message} className="max-w-full"/>
                            <LabelFloat label="Número*" register={register('address.number')} error={errors.address?.number?.message} className="max-w-full"/>
                            <LabelFloat label="Cidade*" register={register('address.city')} error={errors.address?.city?.message} className="max-w-full"/>
                            <LabelFloat label="Estado*" register={register('address.state')} error={errors.address?.state?.message} className="max-w-full"/>
                            <LabelFloat label="Facebook" register={register('social.facebook')} className="max-w-full"/>
                            <LabelFloat label="Instagram" register={register('social.instagram')} className="max-w-full"/>
                            <LabelFloat label="Twitter" register={register('social.twitter')} className="max-w-full"/>
                            <LabelFloat label="Linkedin" register={register('social.linkedin')} className="max-w-full"/>


                            <div className="flex flex-col gap-3 mt-2">
                                <Button type="submit" label="Cadastrar" className="w-full mt-2 bg-affair-600 text-white" isLoading={isLoading} disabled={
                                    !watch('name') || 
                                    !watch('about') || 
                                    !watch('email') || 
                                    !watch('password') || 
                                    !watch('phone') || 
                                    !watch('address.cep') || 
                                    !watch('address.street') || 
                                    !watch('address.number') || 
                                    !watch('address.city') || 
                                    !watch('address.state') || 
                                    !!errors.name || 
                                    !!errors.about || 
                                    !!errors.email || 
                                    !!errors.password || 
                                    !!errors.phone || 
                                    !!errors.address?.cep || 
                                    !!errors.address?.street || 
                                    !!errors.address?.number || 
                                    !!errors.address?.city || 
                                    !!errors.address?.state ||
                                    isLoading
                                } />
                                <Link href="/signin" className="underline text-sm text-center">Já tem uma conta? Entre aqui</Link>
                            </div>
                        </form>
                    </section>
                    <div>
                        <Image src="/foto_inscrevase.svg" alt="Foto de sacolas" width={453} height={453} />
                    </div>
                </section>
            </main>
        </>
    )
}