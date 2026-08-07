import type { ChurchEvent } from "@/types";

export type EventoRow = {
  id: string;
  titulo: string;
  descricao: string | null;
  categoria: string;
  data: string | null;
  hora_inicio: string | null;
  hora_fim: string | null;
  local: string | null;
  imagem_url?: string | null;
  recorrente: boolean;
  dia_semana: number | null;
};

export const diasSemana = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

// Converte a categoria do banco ("Cultos") para o formato usado no site ("culto")
export function categoriaParaType(categoria: string): ChurchEvent["type"] {
  const mapa: Record<string, ChurchEvent["type"]> = {
    Cultos: "culto",
    Reuniões: "reuniao",
    Especiais: "especial",
  };
  return mapa[categoria] ?? "especial";
}

// Converte "18h", "18:00", "18:00 HRS", "6:30" etc. para "18:00:00",
// extraindo hora e minuto de forma robusta, para poder montar um Date válido
export function horaParaFormatoISO(hora: string | null): string {
  if (!hora) return "00:00:00";
  const match = hora.match(/(\d{1,2})(?::(\d{2}))?/);
  if (!match) return "00:00:00";
  const h = Math.min(23, parseInt(match[1], 10) || 0);
  const m = match[2] ? Math.min(59, parseInt(match[2], 10)) : 0;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
}

// Calcula a data/hora da próxima ocorrência de um evento recorrente,
// a partir do dia da semana (0 = Domingo ... 6 = Sábado) e horário.
// Se o horário de hoje já passou, calcula a ocorrência da próxima semana.
export function proximaOcorrencia(
  diaSemana: number,
  hora: string | null,
): Date {
  const agora = new Date();
  const horaISO = horaParaFormatoISO(hora);
  const [h, m] = horaISO.split(":").map(Number);

  const candidato = new Date(agora);
  const diffDias = (diaSemana - agora.getDay() + 7) % 7;
  candidato.setDate(agora.getDate() + diffDias);
  candidato.setHours(h, m, 0, 0);

  // Se cair hoje mas o horário já passou, empurra para a próxima semana
  if (diffDias === 0 && candidato.getTime() < agora.getTime()) {
    candidato.setDate(candidato.getDate() + 7);
  }

  return candidato;
}

// Converte uma linha do banco (tabela eventos) para o formato ChurchEvent
// usado pelos componentes visuais do site
export function linhaParaChurchEvent(linha: EventoRow): ChurchEvent {
  const date =
    linha.recorrente && linha.dia_semana !== null
      ? proximaOcorrencia(linha.dia_semana, linha.hora_inicio)
      : new Date(`${linha.data}T${horaParaFormatoISO(linha.hora_inicio)}`);

  return {
    id: linha.id,
    title: linha.titulo,
    type: categoriaParaType(linha.categoria),
    date,
    location: linha.local ?? "",
    description: linha.descricao ?? undefined,
  };
}
