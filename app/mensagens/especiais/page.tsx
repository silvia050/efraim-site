"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/sections/PageHeader";
import { MessageCard } from "@/components/sections/MessageCard";
import { supabase } from "@/lib/supabase";
import type { SermonMessage, MessageCategory } from "@/types";

// Converte a categoria do banco ("Especiais") para o formato usado no site ("especiais")
function categoriaParaType(categoria: string): MessageCategory {
  const mapa: Record<string, MessageCategory> = {
    Cultos: "cultos",
    Liderança: "lideranca",
    Especiais: "especiais",
    "Kids/Teens": "kids-teens",
  };
  return mapa[categoria] ?? "especiais";
}

export default function MensagensEspeciaisPage() {
  const [mensagens, setMensagens] = useState<SermonMessage[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarMensagens() {
      const { data, error } = await supabase
        .from("mensagens")
        .select("*")
        .eq("categoria", "Especiais")
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
      <PageHeader
        title="Mensagens — Especiais"
        description="Pregações e eventos especiais do Ministério Efraim"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {carregando ? (
          <p className="text-center text-sm text-primary-600">
            Carregando mensagens...
          </p>
        ) : mensagens.length === 0 ? (
          <p className="text-center text-sm text-primary-600">
            Nenhuma mensagem cadastrada nessa categoria ainda.
          </p>
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
