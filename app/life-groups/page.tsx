"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/sections/PageHeader";
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
};

function CardLifeGroup({
  grupo,
  selecionado,
  onSelecionar,
}: {
  grupo: LifeGroup;
  selecionado: boolean;
  onSelecionar: () => void;
}) {
  const quando =
    grupo.dia_semana !== null ? diasSemana[grupo.dia_semana] : "A definir";

  return (
    <div
      className={`rounded-xl border bg-white p-6 shadow-sm transition ${
        selecionado
          ? "border-gold-500 ring-2 ring-gold-200"
          : "border-primary-100"
      }`}
    >
      <h3 className="font-display text-lg font-semibold text-primary-900">
        {grupo.nome}
      </h3>
      <p className="mt-1 text-sm text-primary-600">Líder: {grupo.lider}</p>

      <div className="mt-3 space-y-1 text-sm text-primary-700">
        <p>
          {quando}
          {grupo.horario ? ` às ${grupo.horario}` : ""}
        </p>
        {grupo.bairro && <p>Bairro: {grupo.bairro}</p>}
        {grupo.endereco && <p>{grupo.endereco}</p>}
      </div>

      {grupo.descricao && (
        <p className="mt-3 text-sm text-primary-600">{grupo.descricao}</p>
      )}

      <button
        onClick={onSelecionar}
        className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-medium transition ${
          selecionado
            ? "bg-gold-600 text-white"
            : "border border-gold-600 text-gold-700 hover:bg-gold-50"
        }`}
      >
        {selecionado ? "Selecionado" : "Tenho interesse"}
      </button>
    </div>
  );
}

function FormularioInteresse({
  grupos,
  grupoSelecionadoId,
  onSelecionarGrupo,
}: {
  grupos: LifeGroup[];
  grupoSelecionadoId: string | null;
  onSelecionarGrupo: (id: string) => void;
}) {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (!nome.trim() || !contato.trim()) {
      setErro("Por favor, preencha nome e contato.");
      return;
    }

    setEnviando(true);

    const { error } = await supabase.from("interesses_life_groups").insert({
      nome: nome.trim(),
      contato: contato.trim(),
      life_group_id: grupoSelecionadoId,
      mensagem: mensagem.trim() || null,
    });

    setEnviando(false);

    if (error) {
      setErro("Não foi possível enviar seu interesse. Tente novamente.");
      return;
    }

    setEnviado(true);
    setNome("");
    setContato("");
    setMensagem("");
  }

  if (enviado) {
    return (
      <div className="rounded-xl border border-primary-100 bg-white p-8 text-center shadow-sm">
        <h2 className="font-display text-xl font-semibold text-primary-900">
          Interesse recebido!
        </h2>
        <p className="mt-2 text-sm text-primary-600">
          Em breve alguém da nossa equipe vai entrar em contato com você.
        </p>
        <button
          onClick={() => setEnviado(false)}
          className="mt-6 text-sm font-medium text-gold-700 hover:underline"
        >
          Enviar outro interesse
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-primary-100 bg-white p-6 shadow-sm sm:p-8"
    >
      {grupos.length > 0 && (
        <div>
          <label className="mb-1 block text-sm font-medium text-primary-900">
            Grupo de interesse (opcional)
          </label>
          <select
            value={grupoSelecionadoId ?? ""}
            onChange={(e) => onSelecionarGrupo(e.target.value)}
            className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-primary-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
          >
            <option value="">Ainda não decidi / qualquer grupo</option>
            {grupos.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nome}
              </option>
            ))}
          </select>
        </div>
      )}

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
          Telefone ou e-mail *
        </label>
        <input
          type="text"
          value={contato}
          onChange={(e) => setContato(e.target.value)}
          required
          className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-primary-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
          placeholder="(11) 91234-5678 ou seu@email.com"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-primary-900">
          Mensagem (opcional)
        </label>
        <textarea
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-primary-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
          placeholder="Alguma dúvida ou observação?"
        />
      </div>

      {erro && <p className="text-sm text-red-600">{erro}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded-lg bg-gold-600 px-6 py-3 font-medium text-white transition hover:bg-gold-700 disabled:opacity-60"
      >
        {enviando ? "Enviando..." : "Enviar interesse"}
      </button>
    </form>
  );
}

export default function LifeGroupsPage() {
  const [grupos, setGrupos] = useState<LifeGroup[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [grupoSelecionadoId, setGrupoSelecionadoId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    async function carregarGrupos() {
      const { data, error } = await supabase
        .from("life_groups")
        .select(
          "id, nome, lider, bairro, endereco, dia_semana, horario, capacidade, descricao",
        )
        .eq("ativo", true)
        .order("nome", { ascending: true });

      if (!error && data) {
        setGrupos(data as LifeGroup[]);
      }

      setCarregando(false);
    }

    carregarGrupos();
  }, []);

  return (
    <>
      <PageHeader
        title="Life Groups"
        description="Encontre um grupo perto de você e cresça em comunidade."
      />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {carregando ? (
          <p className="text-center text-sm text-primary-600">
            Carregando grupos...
          </p>
        ) : grupos.length === 0 ? (
          <p className="text-center text-sm text-primary-600">
            Nenhum life group disponível no momento. Preencha o formulário
            abaixo e entraremos em contato.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {grupos.map((grupo) => (
              <CardLifeGroup
                key={grupo.id}
                grupo={grupo}
                selecionado={grupoSelecionadoId === grupo.id}
                onSelecionar={() =>
                  setGrupoSelecionadoId(
                    grupoSelecionadoId === grupo.id ? null : grupo.id,
                  )
                }
              />
            ))}
          </div>
        )}

        <div className="mx-auto mt-12 max-w-xl">
          <h2 className="mb-6 text-center font-display text-2xl font-semibold text-primary-900">
            Tenho interesse em participar
          </h2>
          <FormularioInteresse
            grupos={grupos}
            grupoSelecionadoId={grupoSelecionadoId}
            onSelecionarGrupo={setGrupoSelecionadoId}
          />
        </div>
      </div>
    </>
  );
}
