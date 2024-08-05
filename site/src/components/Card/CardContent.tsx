import { twMerge } from "tailwind-merge";


export function CardContent({ children, className, ...rest }: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <section className={twMerge("", className)} {...rest}>
            {children}
        </section>
    )
}