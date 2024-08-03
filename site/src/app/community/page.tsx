"use client";

import { Card } from "@/components/Card";

export default function Page() {
    return (
        <main className="flex">
            <aside>
                <h3 className="font-bold">Assuntos</h3>

                <ul>
                    <li>
                        <span>Lorem</span>
                    </li>
                </ul>
            </aside>
            <section>
                <h3>Últimas postagens</h3>

                <Card.Root>
                    <></>
                </Card.Root>
                {/* <article>
                    <h4 className="font-bold">Titulo</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac orci molestie ligula gravida efficitur in eget justo.</p>
                </article> */}
            </section>
        </main>
    )
}