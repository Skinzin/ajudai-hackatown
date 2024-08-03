import { twMerge } from "tailwind-merge";


interface CardRootProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function CardRoot({ children, className, ...props }: CardRootProps) {
    return (
        <div className={twMerge("bg-gray-200 rounded-lg shadow-md p-5", className)} {...props}>
            {children}
        </div>
    );
}