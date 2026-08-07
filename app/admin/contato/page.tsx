"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Contato = {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  assunto: string;
  mensagem: string;
  lida: boolean;
  criado_em: string;
};

export default function AdminContatoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function init() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("contatos")
        .select("*")
        .order("criado_em", { ascending: false });

      if (error) {
        setErro("Erro ao carregar mensagens: " + error.message);
      } else {
        setContatos(data as Contato[]);
      }

      setLoading(false);
    }

    init();
  }, [router]);

  async function handleMarcarLida(id: string, lida: boolean) {
    const { error } = await supabase
      .from("contatos")
      .update({ lida: !lida })
      .eq("id", id);

    if (error) {
      alert("Erro ao atualizar: " + error.message);
      return;
    }

    setContatos(contatos.map((c) => (c.id === id ? { ...c, lida: !lida } : c)));
  }

  function formatarData(iso: string): string {
    return new Date(iso).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/admin" className="text-sm text-blue-600 hover:underline">
            &larr; Voltar ao painel
          </Link>
          <h1 className="text-2xl font-bold mt-2">Mensagens de Contato</h1>
        </div>

        {erro && <p className="text-red-600 mb-4">{erro}</p>}

        <div className="space-y-3">
          {contatos.length === 0 && (
            <p className="text-gray-500 bg-white p-6 rounded-lg shadow-md">
              Nenhuma mensagem recebida ainda.
            </p>
          )}

          {contatos.map((c) => (
            <div
              key={c.id}
              className={`bg-white p-5 rounded-lg shadow-md ${
                c.lida ? "opacity-60" : ""
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-semibold">
                    {c.assunto}
                    {!c.lida && (
                      <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                        Nova
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {c.nome} · {c.email}
                    {c.telefone ? ` · ${c.telefone}` : ""}
                  </p>
                </div>
                <button
                  onClick={() => handleMarcarLida(c.id, c.lida)}
                  className="text-sm text-blue-600 hover:underline whitespace-nowrap"
                >
                  {c.lida ? "Marcar como não lida" : "Marcar como lida"}
                </button>
              </div>
              <p className="mt-3 text-gray-700 whitespace-pre-wrap">
                {c.mensagem}
              </p>
              <p className="mt-3 text-xs text-gray-400">
                {formatarData(c.criado_em)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
