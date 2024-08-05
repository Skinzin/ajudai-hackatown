"use client";
import { IconProps } from "@/utils/icons"
import { twMerge } from "tailwind-merge";
import { CircleLoading } from "./CircleLoding";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    leftIcon?: React.FC<IconProps>
    rightIcon?: React.FC<IconProps>
    isLoading?: boolean;
};

export function Button({ label, leftIcon: LIcon, rightIcon: RIcon, isLoading, className, ...rest }: ButtonProps) {
    return (
        <button className={twMerge("px-5 py-2 bg-gray-300 rounded-md disabled:cursor-not-allowed", className)} {...rest}>
            {
                !isLoading ? (
                    <>
                        {LIcon && <LIcon className="w-5 h-5" />}
                        <span>{label}</span>
                        {RIcon && <RIcon className="w-5 h-5" />}
                    </>
                ) : (
                    <CircleLoading />
                )
            }
        </button>
    )
}