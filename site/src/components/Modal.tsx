"use client";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";


interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    onClose: () => void;
    children: React.ReactNode;
}

export function Modal({ onClose, children, className, ...rest }: ModalProps) {

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose?.();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [])

    return (
        <div tabIndex={99} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
            <div {...rest} className={twMerge("bg-white p-4 rounded-lg")} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}