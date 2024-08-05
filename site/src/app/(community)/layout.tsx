import { Header } from "@/components/header";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header className="border-zinc-200 border-b-2" />
      <main className="flex flex-1 px-12">
        <div className="flex flex-1 max-w-7xl w-full mx-auto">
          <aside className="border-r-2 pr-12 mr-4 border-zinc-200 pt-2">
              <h3 className="font-bold">Assuntos</h3>

              <ul>
                  <li>
                  <span>Lorem</span>
                  </li>
              </ul>
          </aside>

          {children}
        </div>
      </main>
    </>
  );
}
