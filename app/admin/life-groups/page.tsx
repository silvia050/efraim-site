"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const diasSemana = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

type LifeGroup = {
  id: string;
  nome: string;
  lider: string;
  bairro: string | null;
  endereco: string | null;
  dia_semana: number | null;
  horario: string | null;
  capacidade: number | null;
  descricao: string | null;
  ativo: boolean;
};

export default function AdminLifeGroupsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [grupos, setGrupos] = useState<LifeGroup[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function init() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("life_groups")
        .select(
          "id, nome, lider, bairro, endereco, dia_semana, horario, capacidade, descricao, ativo",
        )
        .order("nome", { ascending: true });

      if (error) {
        setErro("Erro ao carregar life groups: " + error.message);
      } else {
        setGrupos(data as LifeGroup[]);
      }

      setLoading(false);
    }

    init();
  }, [router]);

  async function handleExcluir(id: string, nome: string) {
    const confirmar = confirm(
      `Tem certeza que deseja excluir "${nome}"? Essa ação não pode ser desfeita.`,
    );
    if (!confirmar) return;

    const { error } = await supabase.from("life_groups").delete().eq("id", id);

    if (error) {
      alert("Erro ao excluir life group: " + error.message);
      return;
    }

    setGrupos(grupos.filter((g) => g.id !== id));
  }

  function formatarQuando(grupo: LifeGroup): string {
    if (grupo.dia_semana === null) return "Dia não definido";
    return diasSemana[grupo.dia_semana];
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
            <h1 className="text-2xl font-bold mt-2">Life Groups</h1>
          </div>
          <Link
            href="/admin/life-groups/novo"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
          >
            + Novo Life Group
          </Link>
        </div>

        {erro && <p className="text-red-600 mb-4">{erro}</p>}

        <div className="bg-white rounded-lg shadow-md divide-y">
          {grupos.length === 0 && (
            <p className="p-6 text-gray-500">
              Nenhum life group cadastrado ainda.
            </p>
          )}

          {grupos.map((grupo) => (
            <div
              key={grupo.id}
              className="p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {grupo.nome}
                  {!grupo.ativo && (
                    <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                      Inativo
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  Líder: {grupo.lider} · {formatarQuando(grupo)}
                  {grupo.horario ? ` · ${grupo.horario}` : ""}
                  {grupo.bairro ? ` · ${grupo.bairro}` : ""}
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  href={`/admin/life-groups/${grupo.id}/editar`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleExcluir(grupo.id, grupo.nome)}
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
