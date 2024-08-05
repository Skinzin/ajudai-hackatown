import { twMerge } from "tailwind-merge";


interface CardRootProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function CardRoot({ children, className, ...props }: CardRootProps) {
    return (
        <div className={twMerge("bg-zinc-50 border-1 border-zinc-200 rounded-lg p-5 w-full", className)} {...props}>
            {children}
        </div>
    );
}