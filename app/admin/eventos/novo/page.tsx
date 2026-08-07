"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { diasSemana } from "@/lib/eventos";

export default function NovoEventoPage() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("Cultos");
  const [recorrente, setRecorrente] = useState(false);
  const [diaSemana, setDiaSemana] = useState("0");
  const [data, setData] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [local, setLocal] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
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

    if (!recorrente && !data) {
      setErro("Informe a data, ou marque o evento como recorrente.");
      return;
    }

    setSalvando(true);

    const { error } = await supabase.from("eventos").insert({
      titulo,
      descricao: descricao || null,
      categoria,
      recorrente,
      dia_semana: recorrente ? Number(diaSemana) : null,
      data: recorrente ? null : data,
      hora_inicio: horaInicio || null,
      hora_fim: horaFim || null,
      local: local || null,
      imagem_url: imagemUrl || null,
    });

    setSalvando(false);

    if (error) {
      setErro("Erro ao criar evento: " + error.message);
      return;
    }

    alert("Evento criado com sucesso!");
    router.push("/admin/eventos");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/admin/eventos"
          className="text-sm text-blue-600 hover:underline"
        >
          &larr; Voltar para eventos
        </Link>
        <h1 className="text-2xl font-bold mt-2 mb-8">Novo Evento</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Título *</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
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

          <div>
            <label className="block text-sm font-medium mb-1">
              Categoria *
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="Cultos">Cultos</option>
              <option value="Reuniões">Reuniões</option>
              <option value="Especiais">Especiais</option>
            </select>
          </div>

          <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={recorrente}
                onChange={(e) => setRecorrente(e.target.checked)}
              />
              Evento recorrente (se repete toda semana, sem data fixa)
            </label>

            {recorrente ? (
              <div className="mt-3">
                <label className="block text-sm font-medium mb-1">
                  Dia da semana *
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
                <p className="mt-1 text-xs text-gray-500">
                  O site sempre mostrará a próxima ocorrência automaticamente.
                </p>
              </div>
            ) : (
              <div className="mt-3">
                <label className="block text-sm font-medium mb-1">Data *</label>
                <input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required={!recorrente}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Hora início
              </label>
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hora fim</label>
              <input
                type="time"
                value={horaFim}
                onChange={(e) => setHoraFim(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Local</label>
            <input
              type="text"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              URL da imagem
            </label>
            <input
              type="text"
              value={imagemUrl}
              onChange={(e) => setImagemUrl(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {erro && <p className="text-red-600 text-sm">{erro}</p>}

          <button
            type="submit"
            disabled={salvando}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {salvando ? "Salvando..." : "Criar Evento"}
          </button>
        </form>
      </div>
    </div>
  );
}
