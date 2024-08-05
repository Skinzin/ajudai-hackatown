import { twMerge } from "tailwind-merge";


export function CardFooter({ children, className, ...rest }: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <footer className={twMerge("border-t-1 border-zinc-300 my-2 py-2", className)} {...rest}>
            {children}
        </footer>
    )
}