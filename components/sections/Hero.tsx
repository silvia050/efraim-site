import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/foto-congregacao-evento.png"
          alt="Congregação do Ministério Efraim"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-primary-950/75" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <span className="mb-4 font-display text-sm uppercase tracking-[0.2em] text-gold-400">
          Igreja em Células
        </span>
        <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          Ministério <span className="text-gold-400">Efraim</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-primary-100">
          Ganhar Almas para Jesus e Cuidar Bem Delas — uma comunidade de fé em
          Carapicuíba, SP.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="#horarios">
            <Button variant="secondary" size="lg">
              Visite-nos
            </Button>
          </Link>
          <Link href="/mensagens/cultos">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Assista Online
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
