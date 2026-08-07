"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/sections/PageHeader";
import { EventCard } from "@/components/sections/EventCard";
import { supabase } from "@/lib/supabase";
import { linhaParaChurchEvent, type EventoRow } from "@/lib/eventos";
import type { ChurchEvent } from "@/types";

const filtros = [
  { id: "todos", label: "Todos" },
  { id: "culto", label: "Cultos" },
  { id: "reuniao", label: "Reuniões" },
  { id: "especial", label: "Especiais" },
] as const;

export default function AgendaPage() {
  const [filtroAtivo, setFiltroAtivo] = useState<string>("todos");
  const [eventos, setEventos] = useState<ChurchEvent[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarEventos() {
      const { data, error } = await supabase.from("eventos").select("*");

      if (error) {
        console.error("Erro ao buscar eventos:", error.message);
        setCarregando(false);
        return;
      }

      // Considera "hoje" a partir da meia-noite, para que eventos de hoje
      // ainda apareçam na agenda mesmo depois do horário já ter passado
      const inicioDeHoje = new Date();
      inicioDeHoje.setHours(0, 0, 0, 0);

      const eventosConvertidos = (data as EventoRow[])
        .map(linhaParaChurchEvent)
        .filter((evento) => evento.date >= inicioDeHoje)
        .sort((a, b) => a.date.getTime() - b.date.getTime());

      setEventos(eventosConvertidos);
      setCarregando(false);
    }

    buscarEventos();
  }, []);

  const eventosFiltrados =
    filtroAtivo === "todos"
      ? eventos
      : eventos.filter((evento) => evento.type === filtroAtivo);

  return (
    <>
      <PageHeader
        title="Agenda"
        description="Confira os próximos eventos e cultos do Ministério Efraim"
      />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filtros.map((filtro) => (
            <button
              key={filtro.id}
              onClick={() => setFiltroAtivo(filtro.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                filtroAtivo === filtro.id
                  ? "border-gold-600 bg-gold-600 text-white"
                  : "border-primary-200 text-primary-600 hover:border-primary-400"
              }`}
            >
              {filtro.label}
            </button>
          ))}
        </div>

        {carregando ? (
          <p className="text-center text-sm text-primary-600">
            Carregando eventos...
          </p>
        ) : eventosFiltrados.length === 0 ? (
          <p className="text-center text-sm text-primary-600">
            Nenhum evento encontrado nessa categoria.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {eventosFiltrados.map((evento) => (
              <EventCard key={evento.id} event={evento} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
