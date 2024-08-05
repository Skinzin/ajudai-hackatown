



export function Form({ children, ...rest}: React.FormHTMLAttributes<HTMLFormElement>) {
    return (
        <form className={rest.className}>
            {children}
        </form>
    )
}