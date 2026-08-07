import type { NavItem } from "@/types";

// Fonte única da estrutura de navegação principal (RF01).
// O Header consome isso para montar o menu com submenus.
// O Footer reaproveita os mesmos links, organizados em outras colunas.
export const mainNav: NavItem[] = [
  {
    label: "Sobre",
    href: "/sobre",
    subItems: [
      { label: "Quem somos", href: "/sobre/quem-somos" },
      { label: "Nosso time", href: "/sobre/nosso-time" },
      { label: "Nossa visão", href: "/sobre/nossa-visao" },
    ],
  },
  {
    label: "Mensagens",
    href: "/mensagens",
    subItems: [
      { label: "Cultos", href: "/mensagens/cultos" },
      { label: "Liderança", href: "/mensagens/lideranca" },
      { label: "Especiais", href: "/mensagens/especiais" },
      { label: "Cultinhos Kids e Teens", href: "/mensagens/kids-teens" },
    ],
  },
  {
    label: "Agenda",
    href: "/agenda",
    subItems: [
      { label: "Ver agenda", href: "/agenda" },
      { label: "Inscrição em Eventos", href: "/inscricao" },
    ],
  },
  {
    label: "Voluntários",
    href: "/contato/voluntarios",
  },
];

// Links de ação que pedem destaque visual no header (não fazem parte do menu de navegação comum)
export const headerCta: NavItem = {
  label: "Contribua",
  href: "/contribua",
};

// Estrutura do rodapé (RF — seção Footer da especificação): 4 colunas temáticas
export const footerColumns: { title: string; items: NavItem[] }[] = [
  {
    title: "Sobre",
    items: [
      { label: "Quem somos", href: "/sobre/quem-somos" },
      { label: "Nosso time", href: "/sobre/nosso-time" },
      { label: "Nossa visão", href: "/sobre/nossa-visao" },
    ],
  },
  {
    title: "Mídia",
    items: [
      { label: "Cultos", href: "/mensagens/cultos" },
      { label: "Liderança", href: "/mensagens/lideranca" },
      { label: "Especiais", href: "/mensagens/especiais" },
      { label: "Cultinhos Kids e Teens", href: "/mensagens/kids-teens" },
    ],
  },
  {
    title: "Conecte-se",
    items: [
      { label: "Agenda", href: "/agenda" },
      { label: "Inscrição em Eventos", href: "/inscricao" },
      { label: "Seja um voluntário", href: "/contato/voluntarios" },
    ],
  },
  {
    title: "Contato",
    items: [
      { label: "Fale conosco", href: "/contato" },
      { label: "Precisa de oração?", href: "/contato#oracao" },
      { label: "Doações", href: "/contribua" },
    ],
  },
];
