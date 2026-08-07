"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "./Logo";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { footerColumns } from "@/lib/navigation";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./SocialIcons";
import { supabase } from "@/lib/supabase";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/efraim.celulas",
    Icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/efraim.celulas",
    Icon: FacebookIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@efraim.celulas",
    Icon: YoutubeIcon,
  },
];

function FormularioNewsletter() {
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email.trim()) return;

    setEnviando(true);
    setStatus("idle");

    const { error } = await supabase
      .from("newsletter_assinantes")
      .insert({ email: email.trim().toLowerCase() });

    setEnviando(false);

    if (error) {
      if (error.code === "23505") {
        setStatus("duplicado");
      } else {
        setStatus("erro");
      }
      return;
    }

    setStatus("sucesso");
    setEmail("");
  }

  if (status === "sucesso") {
    return (
      <p className="mt-4 text-sm text-gold-400">
        Inscrição confirmada! Obrigado por se juntar a nós.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
        aria-label="Seu email"
        required
        className="border-primary-700 bg-primary-800 text-white placeholder:text-primary-400 focus:ring-gold-500 focus:border-gold-500"
      />
      <Button
        type="submit"
        variant="secondary"
        size="sm"
        className="gap-1.5"
        disabled={enviando}
      >
        <Mail className="h-4 w-4" />
        {enviando ? "Enviando..." : "Inscrever-se"}
      </Button>
      {status === "duplicado" ? (
        <p className="text-xs text-primary-300">
          Este e-mail já está cadastrado. Obrigado!
        </p>
      ) : null}
      {status === "erro" ? (
        <p className="text-xs text-red-400">
          Não foi possível concluir a inscrição. Tente novamente.
        </p>
      ) : null}
    </form>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-primary-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo variant="light" />
            <p className="mt-4 text-sm leading-relaxed text-primary-200">
              Cultos de Celebração: Domingo às 9h.
              <br />
              Rua Oscar Bressane, 36, Jd. Elzinha
              <br />
              Carapicuíba – SP, 06362-040
            </p>
            <div className="mt-5 flex gap-3">
              {socialLinks.map((item) => {
                const label = item.label;
                const href = item.href;
                const Icon = item.Icon;
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-700 text-primary-200 transition-colors hover:border-gold-500 hover:text-gold-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-display text-sm font-semibold text-white">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-primary-200 transition-colors hover:text-gold-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-display text-sm font-semibold text-white">
              No seu email
            </h3>
            <p className="mt-4 text-sm text-primary-200">
              Receba avisos de eventos e novas mensagens.
            </p>
            <FormularioNewsletter />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-primary-800 pt-6 text-xs text-primary-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Ministério Efraim. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link
              href="/politica-de-privacidade"
              className="hover:text-gold-400"
            >
              Política de Privacidade
            </Link>
            <span>Protegido por reCAPTCHA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
