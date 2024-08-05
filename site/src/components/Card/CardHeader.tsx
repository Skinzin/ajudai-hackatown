import { twMerge } from "tailwind-merge";


export function CardHeader({ children, className, ...rest }: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <header className={twMerge("flex items-center", className)} {...rest}>
            {children}
        </header>
    )
}