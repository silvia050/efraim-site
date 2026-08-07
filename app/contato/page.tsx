"use client";

import { useState } from "react";
import { PageHeader } from "@/components/sections/PageHeader";
import { supabase } from "@/lib/supabase";

function FormularioContato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (!nome.trim() || !email.trim() || !assunto.trim() || !mensagem.trim()) {
      setErro("Por favor, preencha os campos obrigatórios.");
      return;
    }

    setEnviando(true);

    const { error } = await supabase.from("contatos").insert({
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone.trim() || null,
      assunto: assunto.trim(),
      mensagem: mensagem.trim(),
    });

    setEnviando(false);

    if (error) {
      setErro("Não foi possível enviar sua mensagem. Tente novamente.");
      return;
    }

    setEnviado(true);
    setNome("");
    setEmail("");
    setTelefone("");
    setAssunto("");
    setMensagem("");
  }

  if (enviado) {
    return (
      <div className="rounded-xl border border-primary-100 bg-white p-8 text-center shadow-sm">
        <h2 className="font-display text-xl font-semibold text-primary-900">
          Mensagem enviada!
        </h2>
        <p className="mt-2 text-sm text-primary-600">
          Obrigado por entrar em contato. Vamos responder o quanto antes.
        </p>
        <button
          onClick={() => setEnviado(false)}
          className="mt-6 text-sm font-medium text-gold-700 hover:underline"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-primary-100 bg-white p-6 shadow-sm sm:p-8"
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-primary-900">
          Nome *
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-primary-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
          placeholder="Seu nome"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-primary-900">
          E-mail *
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-primary-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
          placeholder="seu@email.com"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-primary-900">
          Telefone (opcional)
        </label>
        <input
          type="tel"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-primary-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
          placeholder="(11) 91234-5678"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-primary-900">
          Assunto *
        </label>
        <input
          type="text"
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
          required
          className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-primary-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
          placeholder="Sobre o que você quer falar?"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-primary-900">
          Mensagem *
        </label>
        <textarea
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          required
          rows={5}
          className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-primary-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
          placeholder="Escreva sua mensagem aqui..."
        />
      </div>

      {erro && <p className="text-sm text-red-600">{erro}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded-lg bg-gold-600 px-6 py-3 font-medium text-white transition hover:bg-gold-700 disabled:opacity-60"
      >
        {enviando ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}

function FormularioOracao() {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [pedido, setPedido] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (!pedido.trim()) {
      setErro("Por favor, escreva seu pedido de oração.");
      return;
    }

    setEnviando(true);

    const { error } = await supabase.from("pedidos_oracao").insert({
      nome: nome.trim() || null,
      contato: contato.trim() || null,
      pedido: pedido.trim(),
    });

    setEnviando(false);

    if (error) {
      setErro("Não foi possível enviar seu pedido. Tente novamente.");
      return;
    }

    setEnviado(true);
    setNome("");
    setContato("");
    setPedido("");
  }

  if (enviado) {
    return (
      <div className="rounded-xl border border-primary-100 bg-white p-8 text-center shadow-sm">
        <h2 className="font-display text-xl font-semibold text-primary-900">
          Pedido recebido!
        </h2>
        <p className="mt-2 text-sm text-primary-600">
          Estaremos orando por você. Que Deus abençoe sua vida.
        </p>
        <button
          onClick={() => setEnviado(false)}
          className="mt-6 text-sm font-medium text-gold-700 hover:underline"
        >
          Enviar outro pedido
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-primary-100 bg-white p-6 shadow-sm sm:p-8"
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-primary-900">
          Nome (opcional)
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-primary-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
          placeholder="Seu nome, se quiser se identificar"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-primary-900">
          Contato (opcional)
        </label>
        <input
          type="text"
          value={contato}
          onChange={(e) => setContato(e.target.value)}
          className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-primary-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
          placeholder="Telefone ou e-mail, se quiser retorno"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-primary-900">
          Seu pedido de oração *
        </label>
        <textarea
          value={pedido}
          onChange={(e) => setPedido(e.target.value)}
          required
          rows={5}
          className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-primary-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
          placeholder="Compartilhe seu pedido..."
        />
      </div>

      {erro && <p className="text-sm text-red-600">{erro}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded-lg bg-gold-600 px-6 py-3 font-medium text-white transition hover:bg-gold-700 disabled:opacity-60"
      >
        {enviando ? "Enviando..." : "Enviar pedido de oração"}
      </button>

      <p className="text-center text-xs text-primary-500">
        Seu pedido é tratado com cuidado e confidencialidade pela nossa equipe.
      </p>
    </form>
  );
}

export default function ContatoPage() {
  return (
    <>
      <PageHeader
        title="Contato"
        description="Fale com o Ministério Efraim. Vamos adorar ouvir você."
      />

      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center font-display text-2xl font-semibold text-primary-900">
          Fale conosco
        </h2>
        <FormularioContato />
      </div>

      <div
        id="oracao"
        className="mx-auto max-w-xl scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-8"
      >
        <h2 className="mb-6 text-center font-display text-2xl font-semibold text-primary-900">
          Pedido de oração
        </h2>
        <FormularioOracao />
      </div>
    </>
  );
}
