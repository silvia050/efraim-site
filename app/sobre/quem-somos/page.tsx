import { PageHeader } from "@/components/sections/PageHeader";

export default function QuemSomosPage() {
  return (
    <>
      <PageHeader
        title="Quem Somos"
        description="Uma igreja em células, unida por famílias, dedicada a ganhar almas para Jesus e cuidar bem delas."
      />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-6 text-primary-700 leading-relaxed">
          <p>
            O <strong>Ministério Efraim</strong> é uma comunidade de fé
            localizada em Carapicuíba, SP, fundada há mais de 14 anos pelo Pr.
            Nivaldo Batista Zonta, com a visão de construir uma Igreja em
            Células Unidas por Famílias.
          </p>
          <p>
            Nossa missão é simples e profunda:{" "}
            <strong>ganhar almas para Jesus e cuidar bem delas</strong>. Cremos
            que a igreja vai além dos cultos de domingo — é uma família que
            caminha junto, semana após semana, através dos nossos Life Groups e
            do cuidado pastoral próximo de cada membro.
          </p>
          <p>
            Hoje, sob a liderança do Pastor Nivaldo e da Pastora Juliana
            Pulherini Zonta, seguimos crescendo com o mesmo propósito do início:
            ser uma igreja acolhedora, onde cada pessoa é vista, amada e
            discipulada.
          </p>
        </div>
      </div>
    </>
  );
}
