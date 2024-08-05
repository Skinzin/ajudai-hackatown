import { Check } from "@/utils/icons"
import { twMerge } from "tailwind-merge"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
}

export function Checkbox({ label, ...rest }: CheckboxProps) {
    return (
        <label className="flex items-center gap-2 relative">
            <input {...rest} type="checkbox" className={twMerge("peer flex items-center content-center appearance-none p-[4.5px] before:h-1 before:w-1 bg-white border-2 border-zinc-600 rounded-sm outline-none checked:bg-zinc-400 checked:border-transparent", rest.className)} /> 
            <label htmlFor={rest.id} className="flex justify-center items-center absolute left-0 top-0 bottom-0 transition-all duration-75 text-white scale-0 peer-checked:scale-100">
                <Check className="mx-[1px]" size={14} weight="bold" />
            </label>
            <p className="text-zinc-600">{label}</p>
        </label>
    )
}