

type LabelFloatTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    name: string;
}

export function LabelFloatTextarea({ label, name, ...rest }: LabelFloatTextareaProps) {
    return (
        <div className="relative mt-2">
            <textarea id={name} className="resize min-h-11 max-h-72 min-w-28 w-full max-w-96 text-zinc-700 text-base bg-transparent border-1 border-zinc-300 rounded outline-none p-2 focus:border-midnight-blue-950 peer" placeholder=" " {...rest}></textarea>
            <label className="absolute text-zinc-600 left-1 -top-2 bg-white px-2 h-fit text-sm duration-150 font-medium transition-all peer-focus:font-medium peer-focus:text-sm peer-focus:-top-2 peer-focus:text-midnight-blue-950 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 peer-placeholder-shown:text-base" htmlFor={name}>{label}</label>
        </div>
    )
}