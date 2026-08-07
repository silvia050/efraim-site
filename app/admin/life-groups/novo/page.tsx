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

export default function NovoLifeGroupPage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [lider, setLider] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [diaSemana, setDiaSemana] = useState("0");
  const [horario, setHorario] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function checarLogin() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        router.push("/admin/login");
      }
    }
    checarLogin();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (!nome.trim() || !lider.trim()) {
      setErro("Informe ao menos o nome do grupo e o líder.");
      return;
    }

    setSalvando(true);

    const { error } = await supabase.from("life_groups").insert({
      nome: nome.trim(),
      lider: lider.trim(),
      bairro: bairro.trim() || null,
      endereco: endereco.trim() || null,
      dia_semana: Number(diaSemana),
      horario: horario || null,
      capacidade: capacidade ? Number(capacidade) : null,
      descricao: descricao.trim() || null,
      ativo,
    });

    setSalvando(false);

    if (error) {
      setErro("Erro ao criar life group: " + error.message);
      return;
    }

    alert("Life group criado com sucesso!");
    router.push("/admin/life-groups");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/admin/life-groups"
          className="text-sm text-blue-600 hover:underline"
        >
          &larr; Voltar para life groups
        </Link>
        <h1 className="text-2xl font-bold mt-2 mb-8">Novo Life Group</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Nome *</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Ex: Life Group Jardim Elzinha"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Líder *</label>
            <input
              type="text"
              value={lider}
              onChange={(e) => setLider(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Nome do líder do grupo"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Dia da semana
              </label>
              <select
                value={diaSemana}
                onChange={(e) => setDiaSemana(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                {diasSemana.map((dia, index) => (
                  <option key={dia} value={index}>
                    {dia}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Horário</label>
              <input
                type="time"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bairro</label>
            <input
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Endereço</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Capacidade (opcional)
            </label>
            <input
              type="number"
              min="1"
              value={capacidade}
              onChange={(e) => setCapacidade(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Número máximo de participantes"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={ativo}
              onChange={(e) => setAtivo(e.target.checked)}
            />
            Grupo ativo (visível no site)
          </label>

          {erro && <p className="text-red-600 text-sm">{erro}</p>}

          <button
            type="submit"
            disabled={salvando}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {salvando ? "Salvando..." : "Criar Life Group"}
          </button>
        </form>
      </div>
    </div>
  );
}
