import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge, type BadgeProps } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn, formatEventDate } from "@/lib/utils";
import type { ChurchEvent, EventType } from "@/types";

// Cada tipo de evento (RF02) recebe uma cor e um rótulo em português,
// reaproveitado tanto no card padrão quanto no card de destaque.
const eventTypeConfig: Record<EventType, { label: string; badgeVariant: BadgeProps["variant"] }> = {
  culto: { label: "Culto", badgeVariant: "primary" },
  reuniao: { label: "Reunião", badgeVariant: "neutral" },
  especial: { label: "Especial", badgeVariant: "gold" },
};

interface EventCardProps {
  event: ChurchEvent;
  // "featured" é usado uma única vez por página, na seção "Próximo Evento" —
  // por isso o visual maior e mais chamativo não vira o padrão do componente.
  variant?: "default" | "featured";
  className?: string;
}

export function EventCard({ event, variant = "default", className }: EventCardProps) {
  const typeConfig = eventTypeConfig[event.type];

  if (variant === "featured") {
    return (
      <Card
        className={cn(
          "overflow-hidden border-none bg-gradient-to-br from-primary-900 to-primary-700 text-white",
          className
        )}
      >
        <CardContent className="flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge variant="gold" className="mb-3">
              Próximo evento
            </Badge>
            <h3 className="font-display text-2xl font-semibold sm:text-3xl">
              {event.title}
            </h3>
            <div className="mt-3 flex flex-col gap-1.5 text-primary-100 sm:flex-row sm:items-center sm:gap-5">
              <span className="flex items-center gap-1.5 text-sm">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {formatEventDate(event.date)}
              </span>
              {event.location && (
                <span className="flex items-center gap-1.5 text-sm">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {event.location}
                </span>
              )}
            </div>
          </div>
          <Link href="/agenda" className="shrink-0">
            <Button variant="secondary" size="md">
              Ver agenda completa
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <Badge variant={typeConfig.badgeVariant} className="mb-2">
          {typeConfig.label}
        </Badge>
        <CardTitle>{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5 pt-3">
        <span className="flex items-center gap-1.5 text-sm">
          <Calendar className="h-4 w-4 text-primary-400" aria-hidden="true" />
          {formatEventDate(event.date)}
        </span>
        {event.location && (
          <span className="flex items-center gap-1.5 text-sm">
            <MapPin className="h-4 w-4 text-primary-400" aria-hidden="true" />
            {event.location}
          </span>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/agenda#${event.id}`} className="text-sm font-medium text-primary-700 hover:text-primary-900">
          Ver detalhes →
        </Link>
      </CardFooter>
    </Card>
  );
}
