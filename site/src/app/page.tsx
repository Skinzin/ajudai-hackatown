import { Button } from "@/components/button";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

// export async function generateMetadata() {
//   return {
//     title: '...',
//   }
// }

export const metadata: Metadata = {
  title: "Início | Ajudai",
  description: "Generated by create next app",
};

export default function Home() {
  return (
    <main className="flex flex-col gap-12">
      <section className="flex items-center px-36 py-12">
        <div>
          <h1 className="font-bold text-4xl">Lorem ipsum dolor<br/>sit amet</h1>
          <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac orci molestie ligula gravida efficitur in eget justo.</p>
          <div className="flex gap-2 mt-5">
            <Button label="Cadastre sua ONG"  />
            <Button label="Ajude uma ONG" className="bg-zinc-200" />
          </div>
        </div>

        <Image src="https://via.placeholder.com/453x453" className="rounded" alt="32x32" width={453} height={453}/>
      </section>

      <section className="flex justify-center items-center gap-14 bg-zinc-200 px-36 py-12">
        <Image src="https://via.placeholder.com/453x453" className="rounded" alt="32x32" width={453} height={453}/>

        <div>
          <h2 className="font-bold text-4xl">Lorem ipsum dolor sit amet</h2>
          <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac orci molestie ligula gravida efficitur in eget justo.</p>
        </div>
      </section>

      <section className="px-36 py-12">
        <h2 className="font-bold text-4xl text-center">Nossa Missão</h2>
      </section>

      <section className="flex justify-center items-center gap-14 bg-zinc-200 px-36 py-12">
        <Image src="https://via.placeholder.com/453x453" className="rounded" alt="32x32" width={453} height={453}/>

        <div>
          <h2 className="font-bold text-4xl">Lorem ipsum dolor<br/>sit amet</h2>
          <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac orci molestie ligula gravida efficitur in eget justo.</p>
        </div>
      </section>
    </main>
  );
}
