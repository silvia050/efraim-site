"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/Card";
import { Badge, type BadgeProps } from "@/components/ui/Badge";
import { cn, formatLongDate } from "@/lib/utils";
import type { MessageCategory, SermonMessage } from "@/types";

type CategoryInfo = { label: string; badgeVariant: BadgeProps["variant"] };

const categoryConfig: { [K in MessageCategory]: CategoryInfo } = {
  cultos: { label: "Cultos", badgeVariant: "primary" },
  lideranca: { label: "Liderança", badgeVariant: "emerald" },
  especiais: { label: "Especiais", badgeVariant: "gold" },
  "kids-teens": { label: "Cultinhos Kids e Teens", badgeVariant: "neutral" },
};

// Extrai o ID do vídeo de um link do YouTube (watch?v=, youtu.be/, shorts/, ou embed/)
function getYoutubeId(url: string | undefined): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

// Detecta se o link é de um YouTube Shorts (formato vertical)
function isShorts(url: string | undefined): boolean {
  if (!url) return false;
  return url.includes("/shorts/");
}

interface MessageCardProps {
  message: SermonMessage;
  className?: string;
}

export function MessageCard({ message, className }: MessageCardProps) {
  const categoryInfo = categoryConfig[message.category];
  const youtubeId = getYoutubeId(message.videoUrl);
  const vertical = isShorts(message.videoUrl);
  const hasMedia = Boolean(youtubeId) || Boolean(message.thumbnailUrl);

  return (
    <Card
      className={cn(
        "overflow-hidden",
        vertical && "mx-auto w-full max-w-[280px]",
        className,
      )}
    >
      {hasMedia && (
        <div
          className={cn(
            "relative w-full overflow-hidden bg-gradient-to-br from-primary-700 to-primary-900",
            vertical ? "aspect-[9/16] max-h-[500px]" : "aspect-video",
          )}
        >
          {youtubeId ? (
            <>
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&showinfo=0&rel=0&disablekb=1&iv_load_policy=3&cc_load_policy=0`}
                title={message.title}
                className="pointer-events-none absolute inset-0 h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
              {/* Camada que esconde a legenda automática do YouTube, que às vezes
                  aparece mesmo com cc_load_policy=0 */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[10%] bg-gradient-to-t from-primary-950 via-primary-950/80 to-transparent" />
            </>
          ) : (
            message.thumbnailUrl && (
              <Image
                src={message.thumbnailUrl}
                alt={message.title}
                fill
                unoptimized
                className="object-cover"
              />
            )
          )}
        </div>
      )}

      <CardContent className="pb-2 pt-4">
        <Badge variant={categoryInfo.badgeVariant} className="mb-2">
          {categoryInfo.label}
        </Badge>
        <CardTitle className="text-base leading-snug">
          {message.title}
        </CardTitle>
        {message.series && (
          <p className="mt-1 text-sm text-primary-500">
            Série: {message.series}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between text-sm text-primary-400">
        <span>{message.preacher}</span>
        <span>{formatLongDate(message.date)}</span>
      </CardFooter>
    </Card>
  );
}
