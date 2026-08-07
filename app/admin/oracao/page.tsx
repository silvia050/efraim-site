"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type PedidoOracao = {
  id: string;
  nome: string | null;
  contato: string | null;
  pedido: string;
  status: string;
  criado_em: string;
};

const statusOpcoes = ["novo", "em oração", "atendido"];

const statusCores: Record<string, string> = {
  novo: "bg-blue-100 text-blue-700",
  "em oração": "bg-amber-100 text-amber-700",
  atendido: "bg-green-100 text-green-700",
};

export default function AdminOracaoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pedidos, setPedidos] = useState<PedidoOracao[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function init() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("pedidos_oracao")
        .select("*")
        .order("criado_em", { ascending: false });

      if (error) {
        setErro("Erro ao carregar pedidos: " + error.message);
      } else {
        setPedidos(data as PedidoOracao[]);
      }

      setLoading(false);
    }

    init();
  }, [router]);

  async function handleMudarStatus(id: string, novoStatus: string) {
    const { error } = await supabase
      .from("pedidos_oracao")
      .update({ status: novoStatus })
      .eq("id", id);

    if (error) {
      alert("Erro ao atualizar status: " + error.message);
      return;
    }

    setPedidos(
      pedidos.map((p) => (p.id === id ? { ...p, status: novoStatus } : p)),
    );
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
          <h1 className="text-2xl font-bold mt-2">Pedidos de Oração</h1>
        </div>

        {erro && <p className="text-red-600 mb-4">{erro}</p>}

        <div className="space-y-3">
          {pedidos.length === 0 && (
            <p className="text-gray-500 bg-white p-6 rounded-lg shadow-md">
              Nenhum pedido de oração recebido ainda.
            </p>
          )}

          {pedidos.map((p) => (
            <div key={p.id} className="bg-white p-5 rounded-lg shadow-md">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-semibold">
                    {p.nome || "Anônimo"}
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                        statusCores[p.status] ?? "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </p>
                  {p.contato && (
                    <p className="text-sm text-gray-500 mt-0.5">{p.contato}</p>
                  )}
                </div>
                <select
                  value={p.status}
                  onChange={(e) => handleMudarStatus(p.id, e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1"
                >
                  {statusOpcoes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-3 text-gray-700 whitespace-pre-wrap">
                {p.pedido}
              </p>
              <p className="mt-3 text-xs text-gray-400">
                {formatarData(p.criado_em)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
