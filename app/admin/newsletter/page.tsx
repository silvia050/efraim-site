"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Assinante = {
  id: string;
  email: string;
  criado_em: string;
};

export default function AdminNewsletterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [assinantes, setAssinantes] = useState<Assinante[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function init() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("newsletter_assinantes")
        .select("*")
        .order("criado_em", { ascending: false });

      if (error) {
        setErro("Erro ao carregar assinantes: " + error.message);
      } else {
        setAssinantes(data as Assinante[]);
      }

      setLoading(false);
    }

    init();
  }, [router]);

  function formatarData(iso: string): string {
    return new Date(iso).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function copiarTodosEmails() {
    const emails = assinantes.map((a) => a.email).join(", ");
    navigator.clipboard.writeText(emails);
    alert("E-mails copiados para a área de transferência!");
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
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <Link
              href="/admin"
              className="text-sm text-blue-600 hover:underline"
            >
              &larr; Voltar ao painel
            </Link>
            <h1 className="text-2xl font-bold mt-2">
              Newsletter ({assinantes.length})
            </h1>
          </div>
          {assinantes.length > 0 && (
            <button
              onClick={copiarTodosEmails}
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Copiar todos os e-mails
            </button>
          )}
        </div>

        {erro && <p className="text-red-600 mb-4">{erro}</p>}

        <div className="bg-white rounded-lg shadow-md divide-y">
          {assinantes.length === 0 && (
            <p className="p-6 text-gray-500">
              Nenhum assinante cadastrado ainda.
            </p>
          )}

          {assinantes.map((a) => (
            <div key={a.id} className="p-4 flex justify-between items-center">
              <p className="text-gray-800">{a.email}</p>
              <p className="text-xs text-gray-400">
                {formatarData(a.criado_em)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
