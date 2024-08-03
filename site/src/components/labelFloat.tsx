import { twMerge } from "tailwind-merge"


type LabelFloatProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
}

export function LabelFloat({ label, className, ...rest}: LabelFloatProps) {
    return (
        <div className="relative mt-2">
            <input id={rest.name} className="text-zinc-700 w-full max-w-96 text-base bg-transparent border-1 border-zinc-300 rounded outline-none p-2 focus:border-midnight-blue-950 peer" placeholder=" " {...rest} />
            <label className="absolute bg-white text-zinc-600 left-1 -top-2 px-2 h-fit text-sm duration-150 font-medium transition-all peer-focus:font-medium peer-focus:text-sm peer-focus:-top-2 peer-focus:text-midnight-blue-950 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 peer-placeholder-shown:text-base" htmlFor={rest.name}>{label}</label>
        </div>
    )
}