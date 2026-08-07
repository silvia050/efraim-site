import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes do Tailwind de forma segura.
 * - clsx: permite passar classes condicionais (objetos, arrays, booleanos)
 * - twMerge: resolve conflitos (ex: "p-2" vs "p-4") mantendo só a última
 *
 * Exemplo: cn("px-4 py-2", isActive && "bg-primary text-white")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata uma data para o padrão usado nos cards de evento/mensagem do site,
 * ex: "dom, 08 de fev · 16h00"
 */
export function formatEventDate(date: Date): string {
  const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(date);
  const day = new Intl.DateTimeFormat("pt-BR", { day: "2-digit" }).format(date);
  const month = new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(date);
  const time = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  return `${weekday}, ${day} de ${month.replace(".", "")} · ${time}`;
}

/**
 * Versão sem horário, usada em cards de mensagem (onde a hora não importa),
 * ex: "24 de abril de 2023"
 */
export function formatLongDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}
