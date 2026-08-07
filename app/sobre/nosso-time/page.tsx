"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/sections/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";

type MembroEquipe = {
  id: string;
  nome: string;
  cargo: string;
  fotoUrl: string | null;
  bio: string | null;
};

export default function NossosPastoresPage() {
  const [equipe, setEquipe] = useState<MembroEquipe[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarEquipe() {
      const { data, error } = await supabase
        .from("equipe")
        .select("*")
        .order("ordem", { ascending: true });

      if (error) {
        console.error("Erro ao buscar equipe:", error.message);
        setCarregando(false);
        return;
      }

      const equipeConvertida: MembroEquipe[] = (data ?? []).map((linha) => ({
        id: linha.id,
        nome: linha.nome,
        cargo: linha.cargo,
        fotoUrl: linha.foto_url,
        bio: linha.bio,
      }));

      setEquipe(equipeConvertida);
      setCarregando(false);
    }

    buscarEquipe();
  }, []);

  return (
    <>
      <PageHeader
        title="Nossos Pastores"
        description="Conheça os pastores e líderes que, guiados pelo Espírito Santo, dedicam suas vidas ao serviço de Deus e ao cuidado de pessoas."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {carregando ? (
          <p className="text-center text-sm text-primary-600">
            Carregando equipe...
          </p>
        ) : equipe.length === 0 ? (
          <p className="text-center text-sm text-primary-600">
            Nenhum membro da equipe cadastrado ainda.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-2xl mx-auto">
            {equipe.map((membro) => (
              <Card key={membro.id} className="overflow-hidden">
                <div className="relative h-48 w-full bg-gradient-to-br from-primary-700 to-primary-900">
                  {membro.fotoUrl ? (
                    <Image
                      src={membro.fotoUrl}
                      alt={membro.nome}
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-display text-5xl font-semibold text-white/80">
                        {membro.nome
                          .split(" ")
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="p-5">
                  <h3 className="font-display text-lg font-semibold text-primary-900">
                    {membro.nome}
                  </h3>
                  <p className="text-sm font-medium text-gold-600">
                    {membro.cargo}
                  </p>
                  {membro.bio && (
                    <p className="mt-3 text-sm text-primary-600 leading-relaxed">
                      {membro.bio}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
