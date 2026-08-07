"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type CardAdmin = {
  titulo: string;
  descricao: string;
  href: string;
  disponivel: boolean;
};

const cards: CardAdmin[] = [
  {
    titulo: "Eventos",
    descricao: "Criar, editar e remover eventos da agenda.",
    href: "/admin/eventos",
    disponivel: true,
  },
  {
    titulo: "Life Groups",
    descricao: "Criar, editar e remover life groups.",
    href: "/admin/life-groups",
    disponivel: true,
  },
  {
    titulo: "Mensagens de Contato",
    descricao: "Ver mensagens enviadas pelo formulário de contato.",
    href: "/admin/contato",
    disponivel: true,
  },
  {
    titulo: "Pedidos de Oração",
    descricao: "Ver e acompanhar pedidos de oração recebidos.",
    href: "/admin/oracao",
    disponivel: true,
  },
  {
    titulo: "Newsletter",
    descricao: "Ver assinantes cadastrados para receber novidades.",
    href: "/admin/newsletter",
    disponivel: true,
  },
  {
    titulo: "Voluntários",
    descricao: "Gerenciar cadastros de voluntariado.",
    href: "/admin/voluntarios",
    disponivel: true,
  },
  {
    titulo: "Mensagens (Cultos)",
    descricao: "Gerenciar cultos, séries e pregações.",
    href: "#",
    disponivel: false,
  },
  {
    titulo: "Equipe",
    descricao: "Gerenciar liderança e membros da equipe.",
    href: "#",
    disponivel: false,
  },
];

function CardDashboard({ card }: { card: CardAdmin }) {
  const conteudo = (
    <div
      className={`h-full rounded-lg border p-6 shadow-sm transition ${
        card.disponivel
          ? "bg-white border-gray-200 hover:shadow-md hover:border-blue-300 cursor-pointer"
          : "bg-gray-100 border-gray-200 opacity-70 cursor-not-allowed"
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{card.titulo}</h2>
        {!card.disponivel && (
          <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
            Em breve
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-gray-600">{card.descricao}</p>
    </div>
  );

  if (!card.disponivel) {
    return conteudo;
  }

  return <Link href={card.href}>{conteudo}</Link>;
}

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/admin/login");
        return;
      }

      setEmail(data.user.email ?? "");
      setLoading(false);
    }

    checkUser();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
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
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Sair
          </button>
        </div>

        <p className="text-gray-600 mb-6">Logado como: {email}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((card) => (
            <CardDashboard key={card.titulo} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
