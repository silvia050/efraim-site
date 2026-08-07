"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Voluntario = {
  id: string;
  nome: string;
  telefone: string | null;
  email: string | null;
  idade: string | null;
  ministerio: string | null;
  dias_disponiveis: string | null;
  horario: string | null;
  tempo_congregacao: string | null;
  mensagem: string | null;
  created_at: string;
};

export default function AdminVoluntariosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function init() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("voluntarios")
        .select(
          "id, nome, telefone, email, idade, ministerio, dias_disponiveis, horario, tempo_congregacao, mensagem, created_at",
        )
        .order("created_at", { ascending: false });

      if (error) {
        setErro("Erro ao carregar voluntários: " + error.message);
      } else {
        setVoluntarios(data as Voluntario[]);
      }

      setLoading(false);
    }

    init();
  }, [router]);

  async function handleExcluir(id: string, nome: string) {
    const confirmar = confirm(
      `Tem certeza que deseja excluir a inscrição de "${nome}"? Essa ação não pode ser desfeita.`,
    );
    if (!confirmar) return;

    const { error } = await supabase.from("voluntarios").delete().eq("id", id);

    if (error) {
      alert("Erro ao excluir inscrição: " + error.message);
      return;
    }

    setVoluntarios(voluntarios.filter((v) => v.id !== id));
  }

  function formatarData(dataISO: string): string {
    return new Date(dataISO).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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
            <h1 className="text-2xl font-bold mt-2">Voluntários</h1>
          </div>
        </div>

        {erro && <p className="text-red-600 mb-4">{erro}</p>}

        <div className="bg-white rounded-lg shadow-md divide-y">
          {voluntarios.length === 0 && (
            <p className="p-6 text-gray-500">
              Nenhuma inscrição de voluntário ainda.
            </p>
          )}

          {voluntarios.map((v) => (
            <div key={v.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{v.nome}</p>
                  <p className="text-sm text-gray-500">
                    {v.ministerio ?? "Sem ministério informado"} ·{" "}
                    {formatarData(v.created_at)}
                  </p>
                </div>
                <button
                  onClick={() => handleExcluir(v.id, v.nome)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-1 text-sm text-gray-700 sm:grid-cols-2">
                <p>
                  <span className="font-medium">Telefone:</span>{" "}
                  {v.telefone ?? "—"}
                </p>
                <p>
                  <span className="font-medium">E-mail:</span> {v.email ?? "—"}
                </p>
                <p>
                  <span className="font-medium">Idade:</span> {v.idade ?? "—"}
                </p>
                <p>
                  <span className="font-medium">Tempo de congregação:</span>{" "}
                  {v.tempo_congregacao ?? "—"}
                </p>
                <p className="sm:col-span-2">
                  <span className="font-medium">Disponibilidade:</span>{" "}
                  {v.dias_disponiveis || "—"}
                  {v.horario ? ` — ${v.horario}` : ""}
                </p>
                {v.mensagem && (
                  <p className="sm:col-span-2">
                    <span className="font-medium">Mensagem:</span> {v.mensagem}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
