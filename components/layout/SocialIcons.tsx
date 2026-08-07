import { SVGProps } from "react";

// Ícones minimalistas desenhados no mesmo estilo (line-icon, stroke 1.5) dos
// ícones do lucide-react usados no resto do site — não são os logotipos
// oficiais das redes, só representações genéricas e reconhecíveis.

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M13.5 21v-6.5h2l.3-2.5h-2.3V10c0-.7.2-1.2 1.3-1.2h1.2V6.5c-.2 0-1-.1-1.9-.1-2 0-3.3 1.2-3.3 3.4v1.7H8.7v2.5H11V21" />
    </svg>
  );
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="3" />
      <path d="M10.5 9.5v5l4.3-2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}
