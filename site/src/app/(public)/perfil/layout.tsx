import { Metadata } from "next";



export const metadata: Metadata = {
    title: "Perfil | Ajuda aí"
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    )
}