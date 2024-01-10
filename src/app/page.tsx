"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { discs } from "@/data/discs";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [selectedDisc, setSelectedDisc] = useState<{
    id: string;
    description: string;
    url: string;
  }>({ id: "0", description: "", url: "" });

  const randomNumber = () => {
    const indiceAleatorio = Math.floor(Math.random() * discs.length);
    const disc = discs[indiceAleatorio];

    const query = disc.description.split(" ").join("+");

    const url = `https://www.youtube.com/results?search_query=${query}`;

    navigator.clipboard.writeText(disc.description);

    setSelectedDisc({ ...disc, url });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Hey there you bastard!
        </h1>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Quer ouvir um disquinho né? Hm. Ta bom então.
        </p>

        <Button className="mt-5" onClick={() => randomNumber()}>
          Então toma vai, clica aqui
        </Button>
      </div>

      {selectedDisc.id !== "0" && (
        <div className="flex flex-col items-center">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-32 text-center">
            {selectedDisc.description}
          </h2>

          <Button asChild>
            <Link href={selectedDisc.url}>
              Clica aqui e ouve logo, para de enche o saco mermão
            </Link>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="link"
                onClick={() =>
                  navigator.clipboard.writeText(selectedDisc.description)
                }
              >
                Quer ouvir no spotify?
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  não tem como, va lá e pesquise :)
                </AlertDialogTitle>
                <AlertDialogDescription>
                  mas pra te ajuda, o nome do album ta copiado no teu ctrl+c
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Obrigado por nada</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}

      <div className="max-w-[50%] flex flex-col items-end">
        <blockquote className="mt-6 pl-6 italic text-center">
          {
            "'A musica é aquela coisa que, sabe, ta ligado maluco, é tipo, sabe né, aquela coisa que porra, é assim que tipo, faz com que a gente fique meio assim e tals, sabe, tipo, assim, né, tipo, sabe, assim, né, tipo, sabe, assim'"
          }
        </blockquote>
        <p className="leading-7 [&:not(:first-child)]:mt-6">- Papa Francisco</p>
      </div>
    </main>
  );
}
