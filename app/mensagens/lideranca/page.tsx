"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/sections/PageHeader";
import { MessageCard } from "@/components/sections/MessageCard";
import { supabase } from "@/lib/supabase";
import type { SermonMessage, MessageCategory } from "@/types";

const equipe = [
  { nome: "Pr. Nivaldo Batista Zonta", cargo: "Pastor Presidente" },
  { nome: "Pra. Juliana Pulherini Zonta", cargo: "Pastora Vice-Presidente" },
  { nome: "Pr. Rodrigo", cargo: "Liderança" },
  { nome: "Pra. Fernanda", cargo: "Liderança" },
  { nome: "Pr. Fernando", cargo: "Liderança" },
  { nome: "Pra. Edelvita", cargo: "Liderança" },
];

// Converte a categoria do banco ("Liderança") para o formato usado no site ("lideranca")
function categoriaParaType(categoria: string): MessageCategory {
  const mapa: Record<string, MessageCategory> = {
    Cultos: "cultos",
    Liderança: "lideranca",
    Especiais: "especiais",
    "Kids/Teens": "kids-teens",
  };
  return mapa[categoria] ?? "especiais";
}

export default function MensagensLiderancaPage() {
  const [mensagens, setMensagens] = useState<SermonMessage[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarMensagens() {
      const { data, error } = await supabase
        .from("mensagens")
        .select("*")
        .eq("categoria", "Liderança")
        .order("data", { ascending: false });

      if (error) {
        console.error("Erro ao buscar mensagens:", error.message);
        setCarregando(false);
        return;
      }

      const mensagensConvertidas: SermonMessage[] = (data ?? []).map(
        (linha) => ({
          id: linha.id,
          title: linha.titulo,
          description: linha.descricao ?? undefined,
          category: categoriaParaType(linha.categoria),
          preacher: linha.pregador ?? "",
          date: linha.data ? new Date(linha.data) : new Date(),
          videoUrl: linha.youtube_url ?? undefined,
        }),
      );

      setMensagens(mensagensConvertidas);
      setCarregando(false);
    }

    buscarMensagens();
  }, []);

  return (
    <>
      <PageHeader title="Nossa Equipe de Pastores que Lidera com Amor a Obra de Deus" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/time-completo.jpg"
            alt="Equipe de liderança do Ministério Efraim"
            width={900}
            height={600}
            className="h-auto w-full max-w-2xl rounded-xl object-cover opacity-90 shadow-md brightness-105 saturate-75"
            priority
          />
        </div>

        <div className="mx-auto mb-4 max-w-3xl">
          <blockquote className="border-l-4 border-gold-600 pl-4 text-center text-sm italic leading-relaxed text-primary-700 sm:text-base">
            &ldquo;Como pastor ele apascentará o seu rebanho, com o braço
            reunirá os cordeirinhos e os levará no colo; guiará com mansidão as
            ovelhas que amamentam.&rdquo;
            <span className="mt-2 block text-xs font-medium not-italic text-primary-500">
              Isaías 40:11
            </span>
          </blockquote>
        </div>

        <div className="mx-auto mb-12 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
          {equipe.map((membro) => (
            <div key={membro.nome} className="text-center">
              <p className="text-sm font-semibold text-primary-900">
                {membro.nome}
              </p>
              <p className="text-xs text-gold-600">{membro.cargo}</p>
            </div>
          ))}
        </div>

        {carregando ? (
          <p className="text-center text-sm text-primary-600">
            Carregando mensagens...
          </p>
        ) : mensagens.length === 0 ? (
          <div className="mx-auto max-w-md rounded-xl border border-primary-100 bg-primary-50 px-6 py-10 text-center">
            <p className="text-base font-medium text-primary-800">
              Em breve, novas mensagens
            </p>
            <p className="mt-2 text-sm text-primary-600">
              Estamos preparando o conteúdo dessa categoria. Volte em breve para
              conferir as próximas pregações da nossa liderança.
            </p>
          </div>
        ) : mensagens.length === 1 ? (
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <MessageCard message={mensagens[0]} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mensagens.map((mensagem) => (
              <MessageCard key={mensagem.id} message={mensagem} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
