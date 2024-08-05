import { twMerge } from "tailwind-merge";


export function Loading({ className }: { className?: string }) {
    return (
        <div className={twMerge("flex items-end justify-between w-12 gap-1", className)}>
            <div className="shrink-0 w-5 h-5 rounded-[50%] bg-zinc-400 transition-all duration-200 ease-in animate-jump-1"/>
            <div className="shrink-0 w-5 h-5 rounded-[50%] bg-zinc-400 transition-all duration-200 ease-in animate-jump-2"/>
            <div className="shrink-0 w-5 h-5 rounded-[50%] bg-zinc-400 transition-all duration-200 ease-in animate-jump-3"/>
            <div className="shrink-0 w-5 h-5 rounded-[50%] bg-zinc-400 transition-all duration-200 ease-in animate-jump-4"/>
        </div>
    )
}