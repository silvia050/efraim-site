"use client";
import { useState } from "react";
import { PageHeader } from "@/components/sections/PageHeader";

const WHATSAPP_NUMBER = "5511985718576";

const formasPagamento = ["Pix", "Cartão", "Dinheiro", "A combinar"];

export default function InscricaoPage() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [evento, setEvento] = useState("");
  const [pagamento, setPagamento] = useState(formasPagamento[0]);
  const [enviando, setEnviando] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nome.trim() || !telefone.trim() || !evento.trim()) {
      alert("Por favor, preencha nome, telefone e o evento.");
      return;
    }

    setEnviando(true);

    const mensagem = [
      "*Nova inscrição — Ministério Efraim*",
      "",
      `*Nome:* ${nome}`,
      `*Telefone:* ${telefone}`,
      email ? `*E-mail:* ${email}` : null,
      `*Evento:* ${evento}`,
      `*Forma de pagamento:* ${pagamento}`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setEnviando(false);
  }

  return (
    <>
      <PageHeader
        title="Inscrição em Eventos"
        description="Preencha seus dados para se inscrever. Você será direcionado ao WhatsApp para confirmar o envio."
      />

      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-primary-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-primary-900">
              Nome completo *
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-primary-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
              placeholder="Seu nome completo"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-primary-900">
              Telefone / WhatsApp *
            </label>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
              className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-primary-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
              placeholder="(11) 91234-5678"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-primary-900">
              E-mail (opcional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-primary-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-primary-900">
              Evento *
            </label>
            <input
              type="text"
              value={evento}
              onChange={(e) => setEvento(e.target.value)}
              required
              className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-primary-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
              placeholder="Ex: Culto Rosa, Vigília de Oração..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-primary-900">
              Forma de pagamento
            </label>
            <select
              value={pagamento}
              onChange={(e) => setPagamento(e.target.value)}
              className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-primary-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
            >
              {formasPagamento.map((forma) => (
                <option key={forma} value={forma}>
                  {forma}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="w-full rounded-lg bg-gold-600 px-6 py-3 font-medium text-white transition hover:bg-gold-700 disabled:opacity-60"
          >
            Enviar inscrição via WhatsApp
          </button>

          <p className="text-center text-xs text-primary-500">
            Ao clicar, o WhatsApp abrirá com uma mensagem pronta. Basta
            confirmar o envio por lá.
          </p>
        </form>
      </div>
    </>
  );
}
