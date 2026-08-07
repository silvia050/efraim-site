"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { EventCard } from "@/components/sections/EventCard";
import { ScheduleSection } from "@/components/sections/ScheduleSection";
import { supabase } from "@/lib/supabase";
import { linhaParaChurchEvent, type EventoRow } from "@/lib/eventos";
import type { ChurchEvent } from "@/types";

export default function Home() {
  const [proximoEvento, setProximoEvento] = useState<ChurchEvent | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarProximoEvento() {
      const { data, error } = await supabase.from("eventos").select("*");

      if (error) {
        console.error("Erro ao buscar próximo evento:", error.message);
        setCarregando(false);
        return;
      }

      const agora = new Date();
      const eventosConvertidos = (data as EventoRow[]).map(
        linhaParaChurchEvent,
      );

      const futuros = eventosConvertidos
        .filter((evento) => evento.date.getTime() >= agora.getTime())
        .sort((a, b) => a.date.getTime() - b.date.getTime());

      setProximoEvento(futuros[0] ?? null);
      setCarregando(false);
    }

    buscarProximoEvento();
  }, []);

  return (
    <>
      <Hero />

      {/* Próximo Evento */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center font-display text-3xl font-semibold text-primary-900">
          Próximo Evento
        </h2>
        {carregando ? (
          <p className="text-center text-sm text-primary-600">Carregando...</p>
        ) : proximoEvento ? (
          <EventCard event={proximoEvento} variant="featured" />
        ) : (
          <p className="text-center text-sm text-primary-600">
            Nenhum evento agendado no momento.
          </p>
        )}
      </section>

      {/* Nossos Horários */}
      <ScheduleSection />
    </>
  );
}
