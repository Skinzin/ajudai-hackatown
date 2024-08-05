"use client";
import { HandHeart, Info, Plus, Warning } from "@/utils/icons"
import { twMerge } from "tailwind-merge";
import { Card } from "@/components/Card";
import Image from "next/image";
import { Button } from "@/components/button";
import { LabelFloat } from "@/components/labelFloat";
import Head from "next/head";
import { useState } from "react";
import { Modal } from "@/components/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormItemData, schemaFormItem } from "@/utils/schemas";
import { DragDrop } from "@/components/DragDrop";
import { Select } from "@/components/select";
import toast from "react-hot-toast";
import api from "@/services/api";
import { Map } from "@/components/Map";

export default function Page() {
    const [showModal, setShowModal] = useState(false);
    const [modalTypeContent, setModalTypeContent] = useState<"confirmDeleteAccount" | "newItem" | "newSocial" | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    
    return (
        <main className="flex justify-between h-full px-12 py-2 max-w-7xl w-full mx-auto">
            <div className="flex flex-col max-w-3xl w-full">
                <h1 className="text-pelorous-600 text-4xl font-bold">Meu perfil</h1>
                <section>
                    <h2 className="text-2xl font-bold">Nome</h2>
                    <p>Lorem</p>
                    <LabelFloat type={ isEdit ? "text" : "hidden" } label="Nome" value="" />
                </section>

                <section>
                    <h2 className="text-2xl font-bold">Área de atuação</h2>
                    <p>Lorem</p>
                    <LabelFloat type={ isEdit ? "text" : "hidden" } label="Área de atuação" value="" />
                </section>

                <section>
                    <h2 className="text-2xl font-bold">Sobre</h2>
                    <p>Lorem</p>
                    <LabelFloat type={ isEdit ? "text" : "hidden" } label="Sobre" value="" />
                </section>

                <section>
                    <div>
                        <button className={twMerge("flex items-center py-1 px-2 gap-1 bg-zinc-400 text-white w-fit rounded-full", true && "bg-affair-600")}>
                            <HandHeart />
                            <p>Aceito voluntários</p>
                        </button>
                        <LabelFloat type={ isEdit ? "text" : "hidden" } label="Aceito volcuntários" value="false" />
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-500">
                        <Info />
                        <p>
                            Clique para informar no seu perfil se você aceita voluntários.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold">Contato</h2>
                    <button className="flex items-center gap-2" onClick={() => {
                        setModalTypeContent("newSocial");
                        setShowModal(true);
                    }}>
                        <Plus size={22} className="bg-pelorous-600 p-1 rounded-full"/>
                        <p>Adicionar outra rede</p>
                    </button>
                </section>

                <section className="">
                    <h2 className="text-2xl font-bold">Localização</h2>
                    <div className="flex flex-col w-full h-64">
                        <Map
                            position={{ latitude: 0, longitude: 0 }}
                            locationsMaker={[{ latitude: 0, longitude: 0 }]}
                            className="border-none rounded-t-2xl z-0"
                            zoomControl={false}
                            scrollWheelZoom={false}
                            dragging={false}
                        />
                        <section className="bg-pelorous-600 text-white py-2 rounded-b-2xl">
                            <p className="text-center text-base">Rua dos Bobos, 0 - São Paulo, SP - 00000-000</p>
                        </section>
                    </div>
                </section>

                <hr className="my-4"/>

                <section>
                    <h2 className="text-2xl font-bold">Aceitamos doações</h2>
                    <div className="flex gap-2">
                        <Card.Root className="w-fit p-0">
                            <Card.Header>
                                <Image src="https://via.placeholder.com/181x113" alt="Imagem" width={181} height={113} />
                            </Card.Header>
                            <Card.Content className="px-2 py-4">
                                <h3 className="text-2xl">Nome</h3>
                                <div className="flex items-center justify-between">
                                    <p>Quant.</p>
                                    <p>01</p>
                                </div>

                                <div className="text-white text-center text-sm bg-zinc-400 w-full rounded-full p-2 mt-2">
                                    <p>Importancia</p>
                                </div>
                            </Card.Content>
                        </Card.Root>
                        <Card.Root onClick={() => {
                            setShowModal(true);
                            setModalTypeContent("newItem");
                        }} className="flex items-center justify-center max-w-[181px] border-noone bg-zinc-100 hover:cursor-pointer">
                            <Card.Content>
                                <Plus weight="bold" size={52} className="text-zinc-400" />
                            </Card.Content>
                        </Card.Root>
                    </div>
                </section>
                <section className="my-4">
                    <h2 className="text-2xl font-bold">Estamos doando</h2>
                </section>

                {
                    showModal && (
                        <Modal onClose={() => {
                            setShowModal(false);
                            setModalTypeContent(null);
                        }}>
                            {modalTypeContent === "newItem" && <CreateItem setShowModal={setShowModal} />}
                            {modalTypeContent === "confirmDeleteAccount" && <ConfirmDeleteAccount setShowModal={setShowModal} />}
                            {modalTypeContent === "newSocial" && <CreateSocial setShowModal={setShowModal} />}
                        </Modal>
                    )
                }

                <Button 
                    className="flex items-center gap-2 bg-red-500 text-white w-fit px-4 py-2 rounded-lg my-4"
                    leftIcon={Warning}
                    label="Excluir conta"
                    onClick={() => {
                        setModalTypeContent("confirmDeleteAccount");
                        setShowModal(true);
                    }}
                />
            </div>

            <div className="mx-auto">
                <div className="bg-zinc-400 rounded-full w-[349px] h-[349px]" />

            </div>
        </main>
    );
}

function CreateItem({ setShowModal }: { setShowModal: (value: boolean) => void }) {
    const [file, setFile] = useState<File>();

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
        reset,
        watch,
    } = useForm<FormItemData>({
        resolver: zodResolver(schemaFormItem),
        mode: "onChange"
    });

    function onSubmitItem(data: FormItemData) {

        var dataItem: FormItemData = {
            ...data
        }

        if(file) {
            var formData = new FormData();
            formData.set("file", file as File);
            dataItem = {
                ...dataItem,
                photo: formData
            }
        }

        try {
            api.post("/item", dataItem)
                .then((response) => {
                    if(response.status === 201) {
                        toast.success("Item criado com sucesso");
                        reset();
                        window.location.reload();
                        setShowModal(false);
                        return;
                    } else {
                        throw new Error("Erro ao criar item");
                    }
                })
                    .catch((err) => {
                        throw new Error("Erro ao criar item");
                    })
        } catch(err) {
            toast.error("Erro ao criar item");
            console.error(err);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitItem)}>
                <h2>Crair um novo item</h2>
                <LabelFloat type="text" label="Titulo" register={register("title")} error={errors.title?.message} />
                <LabelFloat type="text" label="Quantidade" register={register("amount")} error={errors.amount?.message} />
                <LabelFloat type="text" label="Categoria" register={register("category")} error={errors.category?.message} />
                <LabelFloat type="number" label="Valor da doação" register={register("donationValue")} error={errors.donationValue?.message} />
                <LabelFloat type="text" label="Prioridade" register={register("priority")} error={errors.priority?.message} />
                <DragDrop onFileSelect={setFile} className="my-0 mt-2" />
                <Select 
                    options={[
                        { value: "need", label: "Recebendo" },
                        { value: "provide", label: "Doando" }
                    ]} 
                    label="Você está recebendo ou doando este item?" 
                />
                
                <Button 
                    className="bg-pelorous-600 text-white w-full rounded-lg mt-4"
                    label="Criar"
                    isLoading={isLoading}
                />
            </form>
        </>
    )

}

function ConfirmDeleteAccount({ setShowModal }: { setShowModal: (value: boolean) => void }) {
    function deleteAccount() {
        api.post("/account/delete")
            .then((response) => {
                if(response.status === 200) {
                    toast.success("Conta deletada com sucesso");
                    window.location.href = "/";
                    localStorage.clear();
                } else {
                    throw new Error("Erro ao deletar conta");
                }
            })
            .catch((err) => {
                toast.error("Erro ao deletar conta");
                console.error(err);
            })
    }

    return (
        <>
            <h2 className="text-2xl font-bold">Deletar conta</h2>
            <p>Tem certeza que deseja deletar sua conta?</p>
            <div className="flex gap-2">
                <Button 
                    className="bg-red-500 text-white w-full rounded-lg"
                    label="Deletar"
                    onClick={deleteAccount}
                />
                <Button 
                    className="bg-zinc-400 text-white w-full rounded-lg"
                    label="Cancelar"
                    onClick={() => setShowModal(false)}
                />
            </div>
        </>
    )
}

function CreateSocial({ setShowModal }: { setShowModal: (value: boolean) => void }) {
    const [link, setLink] = useState<string>("");

    function handleSubmit() {
        // Salvar nova rede social
        api.post("/social", {
            social: link
        })
            .then((response) => {
                if(response.status === 201) {
                    toast.success("Rede social criada com sucesso");
                    setShowModal(false);
                    return;
                } else {
                    throw new Error("Erro ao criar rede social");
                }
            })
            .catch((err) => {
                toast.error("Erro ao criar rede social");
                console.error(err);
            })
    }

    return (
        <>
            <h2 className="text-center font-bold">Criar nova rede social</h2>
            <LabelFloat type="text" label="Link" />
            <Button 
                label="Salvar"
                onClick={handleSubmit}
                className="w-full"
            />
            <Button 
                label="Cancelar"
                onClick={() => setShowModal(false)}
                className="w-full"
            />
        </>
    )
}