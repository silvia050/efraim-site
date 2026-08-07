import { PageHeader } from "@/components/sections/PageHeader";

const valores = [
  {
    titulo: "Palavra",
    descricao:
      "A Bíblia é a nossa base — ela guia nossas decisões, nosso caráter e nossa visão de mundo.",
  },
  {
    titulo: "Família",
    descricao:
      "Acreditamos que a família é o alicerce da sociedade e investimos em casamentos e lares saudáveis.",
  },
  {
    titulo: "Comunidade",
    descricao:
      "As células são o coração da nossa church life — é onde o cuidado, o crescimento e a missão acontecem de verdade.",
  },
  {
    titulo: "Serviço",
    descricao:
      "Seguimos o exemplo de Jesus: servir não é um cargo, é um estilo de vida que abraçamos juntos.",
  },
  {
    titulo: "Multiplicação",
    descricao:
      "Nossa visão é multiplicar — discípulos, células, líderes e comunidades de fé por toda a região.",
  },
  {
    titulo: "Presença",
    descricao:
      "Buscamos uma cultura de adoração e oração onde a presença de Deus é bem-vinda em todos os momentos.",
  },
];

export default function NossaVisaoPage() {
  return (
    <>
      <PageHeader
        title="Nossa Visão"
        description="Os valores que guiam cada passo do Ministério Efraim"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Declaração de visão */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold text-primary-900">
            Ser frutíferos onde Deus nos plantou
          </h2>
          <p className="mt-4 text-lg text-primary-600 leading-relaxed">
            Nossa visão é ver Carapicuíba e região transformada pelo Evangelho —
            família por família, célula por célula, geração por geração.
          </p>
        </div>

        {/* Grid de valores */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {valores.map((valor) => (
            <div
              key={valor.titulo}
              className="rounded-lg border border-primary-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 inline-block rounded-md bg-primary-50 px-3 py-1">
                <span className="font-display text-sm font-semibold text-primary-800">
                  {valor.titulo}
                </span>
              </div>
              <p className="text-primary-600 leading-relaxed">
                {valor.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
