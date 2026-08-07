import type {
  ChurchEvent,
  ChurchLocation,
  SermonMessage,
  ServiceSchedule,
  TeamMember,
} from "@/types";

export const mockNextEvent: ChurchEvent = {
  id: "evt-1",
  title: "Culto de Celebração",
  type: "culto",
  date: new Date("2026-07-05T18:00:00"),
  location: "Templo sede — Carapicuíba, SP",
};

export const mockEvents: ChurchEvent[] = [
  mockNextEvent,
  {
    id: "evt-2",
    title: "Reunião de Líderes",
    type: "reuniao",
    date: new Date("2026-07-07T20:00:00"),
    location: "Sala de Reuniões",
  },
  {
    id: "evt-3",
    title: "Vigília de Oração",
    type: "especial",
    date: new Date("2026-07-11T22:00:00"),
    location: "Templo sede — Carapicuíba, SP",
  },
];

export const mockMessages: SermonMessage[] = [
  {
    id: "msg-1",
    title: "Mensagem Ministério Efraim",
    category: "kids-teens",
    preacher: "Ministério Kids e Teens",
    date: new Date("2024-01-01T12:00:00"),
    videoUrl: "https://www.youtube.com/watch?v=Le-6nyz_7wk",
  },
  {
    id: "msg-2",
    title: "Culto Ministério Efraim",
    category: "kids-teens",
    preacher: "Ministério Kids e Teens",
    date: new Date("2024-01-08T12:00:00"),
    videoUrl: "https://www.youtube.com/watch?v=GLcvm8DzU_4",
  },
  {
    id: "msg-3",
    title: "Pregação Ministério Efraim",
    category: "kids-teens",
    preacher: "Ministério Kids e Teens",
    date: new Date("2024-01-15T12:00:00"),
    videoUrl: "https://www.youtube.com/watch?v=c-2GdTjkDGc",
  },
  {
    id: "msg-4",
    title: "Celebração da Santa Ceia",
    category: "lideranca",
    preacher: "Pr. Nivaldo Batista Zonta",
    date: new Date("2026-07-05T18:00:00"),
    videoUrl: "https://www.youtube.com/watch?v=-s7zmxCi7kg",
  },
  {
    id: "msg-5",
    title: "Salvação em Cristo Jesus",
    series: "A Palavra de Deus é Viva e Eficaz",
    category: "cultos",
    preacher: "Pra. Juliana Pulherini Zonta",
    date: new Date("2026-07-26T18:00:00"),
    videoUrl: "https://www.youtube.com/watch?v=lvF74fEVAfE",
  },
  {
    id: "msg-6",
    title: "A Palavra que Transforma",
    series: "A Palavra de Deus é Viva e Eficaz",
    category: "cultos",
    preacher: "Pr. Nivaldo Batista Zonta",
    date: new Date("2026-07-26T18:00:00"),
    videoUrl: "https://www.youtube.com/watch?v=-s7zmxCi7kg",
  },
  {
    id: "msg-7",
    title: "Dependente de Deus",
    category: "cultos",
    preacher: "Pr. Rodrigo",
    date: new Date("2026-07-26T18:00:00"),
    videoUrl: "https://www.youtube.com/watch?v=-ZNMLa-Fw48",
  },
  {
    id: "msg-8",
    title: "Ministração Especial 1",
    category: "especiais",
    preacher: "Ministrações Especiais",
    date: new Date("2026-07-26T18:00:00"),
    videoUrl: "https://www.youtube.com/shorts/A-NZKitOYXY",
  },
  {
    id: "msg-9",
    title: "Ministração Especial 2",
    category: "especiais",
    preacher: "Ministrações Especiais",
    date: new Date("2026-07-26T18:00:00"),
    videoUrl: "https://www.youtube.com/shorts/WAptg7zxbcI",
  },
  {
    id: "msg-10",
    title: "Ministração Especial 3",
    category: "especiais",
    preacher: "Ministrações Especiais",
    date: new Date("2026-07-26T18:00:00"),
    videoUrl: "https://www.youtube.com/shorts/DMSDMjcOSxc",
  },
];

export const mockAllMessages: SermonMessage[] = [...mockMessages];

export const mockSchedules: ServiceSchedule[] = [
  { id: "sch-1", label: "Intercessão", weekday: "Domingo", time: "8h às 9h" },
  {
    id: "sch-2",
    label: "EBD (Escola Bíblica Dominical)",
    weekday: "Domingo",
    time: "9h",
  },
  { id: "sch-3", label: "Culto de Adoração", weekday: "Domingo", time: "18h" },
  { id: "sch-4", label: "Campanha (obreiros)", weekday: "Terça", time: "20h" },
  {
    id: "sch-5",
    label: "Campanha (Ministério Feminino)",
    weekday: "Quinta",
    time: "20h",
  },
];

export const mockLocation: ChurchLocation = {
  street: "Rua Oscar Bressane",
  number: "36",
  neighborhood: "Jd. Elzinha",
  city: "Carapicuíba",
  state: "SP",
  zipCode: "06362-040",
};

export const mockTeam: TeamMember[] = [
  {
    id: "tm-1",
    name: "Pr. Nivaldo Batista Zonta",
    role: "Pastor Presidente e Fundador",
    photoUrl: "/images/pastor-nivaldo.jpg",
    bio: "Fundou o Ministério Efraim há 14 anos com a visão de ganhar almas para Jesus e cuidar bem delas, construindo uma Igreja em Células Unidas por Famílias.",
  },
  {
    id: "tm-2",
    name: "Pra. Juliana Pulherini Zonta",
    role: "Pastora Vice-Presidente",
    photoUrl: "/images/pastora-juliana.png",
    bio: "Ao lado do pastor Nivaldo, lidera o Ministério Efraim com dedicação ao cuidado pastoral e ao fortalecimento das famílias da comunidade.",
  },
];

export const mockAgendaEvents: ChurchEvent[] = [
  ...mockEvents,
  {
    id: "evt-4",
    title: "Culto de Celebração",
    type: "culto",
    date: new Date("2026-07-12T18:00:00"),
    location: "Templo sede — Carapicuíba, SP",
  },
  {
    id: "evt-5",
    title: "Encontro de Casais",
    type: "especial",
    date: new Date("2026-07-19T18:00:00"),
    location: "Templo sede — Carapicuíba, SP",
    description:
      "Um encontro especial para casais fortalecerem seus relacionamentos.",
  },
  {
    id: "evt-6",
    title: "Culto de Celebração",
    type: "culto",
    date: new Date("2026-07-19T18:00:00"),
    location: "Templo sede — Carapicuíba, SP",
  },
  {
    id: "evt-7",
    title: "Treinamento de Líderes",
    type: "reuniao",
    date: new Date("2026-07-21T20:00:00"),
    location: "Sala de Reuniões",
  },
  {
    id: "evt-8",
    title: "Culto de Celebração",
    type: "culto",
    date: new Date("2026-07-26T18:00:00"),
    location: "Templo sede — Carapicuíba, SP",
  },
];
