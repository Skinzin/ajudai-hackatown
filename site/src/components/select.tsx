import { twMerge } from "tailwind-merge";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: Array<{ value: string, label: string}>
}

export function Select({ label, name, options, className, ...rest }: SelectProps) {
    return (
        <div className={twMerge("flex flex-col", className)}>
            <label htmlFor={name} className="text-base text-zinc-600">{label}</label>
            <select name={name} id={name} className="text-zinc-700 w-full max-w-96 text-base bg-transparent border-1 border-zinc-300 rounded outline-none p-2 focus:border-midnight-blue-950 peer" {...rest}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}