"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { diasSemana } from "@/lib/eventos";

type Evento = {
  id: string;
  titulo: string;
  descricao: string | null;
  categoria: string;
  data: string | null;
  hora_inicio: string | null;
  hora_fim: string | null;
  local: string | null;
  recorrente: boolean;
  dia_semana: number | null;
};

export default function AdminEventosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function init() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("eventos")
        .select(
          "id, titulo, descricao, categoria, data, hora_inicio, hora_fim, local, recorrente, dia_semana",
        )
        .order("data", { ascending: true });

      if (error) {
        setErro("Erro ao carregar eventos: " + error.message);
      } else {
        setEventos(data as Evento[]);
      }

      setLoading(false);
    }

    init();
  }, [router]);

  async function handleExcluir(id: string, titulo: string) {
    const confirmar = confirm(
      `Tem certeza que deseja excluir "${titulo}"? Essa ação não pode ser desfeita.`,
    );
    if (!confirmar) return;

    const { error } = await supabase.from("eventos").delete().eq("id", id);

    if (error) {
      alert("Erro ao excluir evento: " + error.message);
      return;
    }

    setEventos(eventos.filter((e) => e.id !== id));
  }

  function formatarQuando(evento: Evento): string {
    if (evento.recorrente && evento.dia_semana !== null) {
      return `Toda ${diasSemana[evento.dia_semana]}`;
    }
    return evento.data ?? "Sem data";
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link
              href="/admin"
              className="text-sm text-blue-600 hover:underline"
            >
              &larr; Voltar ao painel
            </Link>
            <h1 className="text-2xl font-bold mt-2">Eventos</h1>
          </div>
          <Link
            href="/admin/eventos/novo"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
          >
            + Novo Evento
          </Link>
        </div>

        {erro && <p className="text-red-600 mb-4">{erro}</p>}

        <div className="bg-white rounded-lg shadow-md divide-y">
          {eventos.length === 0 && (
            <p className="p-6 text-gray-500">Nenhum evento cadastrado ainda.</p>
          )}

          {eventos.map((evento) => (
            <div
              key={evento.id}
              className="p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {evento.titulo}
                  {evento.recorrente && (
                    <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                      Recorrente
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  {evento.categoria} · {formatarQuando(evento)}
                  {evento.hora_inicio ? ` · ${evento.hora_inicio}` : ""}
                  {evento.local ? ` · ${evento.local}` : ""}
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  href={`/admin/eventos/${evento.id}/editar`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleExcluir(evento.id, evento.titulo)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
