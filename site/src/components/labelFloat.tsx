"use client";
import { IconProps } from "@phosphor-icons/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge"

type LabelFloatProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    rightAction?: React.FC<IconProps>;
    register?: UseFormRegisterReturn<any>;
}

export function LabelFloat({ label, className, error, register, rightAction: RAction, ...rest}: LabelFloatProps) {
    return (
        <>
            <div className="relative mt-2 w-full">
                <input id={rest.name || register?.name} className={twMerge("text-zinc-700 w-full max-w-96 text-base bg-transparent border-1 border-zinc-300 rounded outline-none p-2 focus:border-midnight-blue-950 peer disabled:cursor-not-allowed", className, error && "border-red-500 focus:border-red-500")} placeholder=" " {...rest} {...register} />
                <label className={twMerge("absolute bg-white text-zinc-600 left-1 -top-2 px-2 h-fit text-sm duration-150 font-medium transition-all peer-focus:font-medium peer-focus:text-sm peer-focus:-top-2 peer-focus:text-midnight-blue-950 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 peer-placeholder-shown:text-base", error && "text-red-500 peer-focus:text-red-500", rest.type == "hidden" && "hidden")} htmlFor={rest.name || register?.name}>{label}</label>
                {RAction && <div className="absolute top-2 bottom-0 right-2"><RAction className="bg-white"/></div>}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </>
    )
}