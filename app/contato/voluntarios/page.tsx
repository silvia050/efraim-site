"use client";

import { useState } from "react";
import { PageHeader } from "@/components/sections/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";
import { ministerios } from "./ministerios-data";

const WHATSAPP_IGREJA = "5511985718576";
const EMAIL_SECRETARIA = "meic.efraim@hotmail.com";

const disponibilidadesDias = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

type FormState = {
  nome: string;
  telefone: string;
  email: string;
  idade: string;
  ministerio: string;
  dias: string[];
  horario: string;
  tempoCongregacao: string;
  mensagem: string;
};

const formVazio: FormState = {
  nome: "",
  telefone: "",
  email: "",
  idade: "",
  ministerio: "",
  dias: [],
  horario: "",
  tempoCongregacao: "",
  mensagem: "",
};

function montarTextoInscricao(form: FormState) {
  const nomeMinisterio =
    ministerios.find((m) => m.id === form.ministerio)?.nome ?? "Não informado";

  return `*Inscrição de Voluntário — Ministério Efraim*

*Nome completo:* ${form.nome}
*Telefone/WhatsApp:* ${form.telefone}
*E-mail:* ${form.email}
*Idade:* ${form.idade}
*Ministério de interesse:* ${nomeMinisterio}
*Disponibilidade:* ${form.dias.join(", ") || "Não informado"} — ${form.horario || "horário não informado"}
*Tempo de congregação:* ${form.tempoCongregacao}
*Mensagem:* ${form.mensagem || "—"}`;
}

export default function VoluntariosPage() {
  const [form, setForm] = useState<FormState>(formVazio);
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erroSalvar, setErroSalvar] = useState(false);

  function selecionarMinisterio(id: string) {
    setForm((prev) => ({ ...prev, ministerio: id }));
    document
      .getElementById("formulario-voluntarios")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function alternarDia(dia: string) {
    setForm((prev) => ({
      ...prev,
      dias: prev.dias.includes(dia)
        ? prev.dias.filter((d) => d !== dia)
        : [...prev.dias, dia],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setErroSalvar(false);

    // Primeiro, salva os dados no Supabase (garante que nada se perca)
    const { error } = await supabase.from("voluntarios").insert({
      nome: form.nome,
      telefone: form.telefone,
      email: form.email,
      idade: form.idade,
      ministerio:
        ministerios.find((m) => m.id === form.ministerio)?.nome ??
        form.ministerio,
      dias_disponiveis: form.dias.join(", "),
      horario: form.horario,
      tempo_congregacao: form.tempoCongregacao,
      mensagem: form.mensagem,
    });

    if (error) {
      console.error("Erro ao salvar inscrição:", error.message);
      setErroSalvar(true);
    }

    // Depois, abre o WhatsApp e o e-mail como já fazia antes
    const texto = montarTextoInscricao(form);
    const textoCodificado = encodeURIComponent(texto);

    window.open(
      `https://wa.me/${WHATSAPP_IGREJA}?text=${textoCodificado}`,
      "_blank",
    );

    const assunto = encodeURIComponent(
      `Inscrição de voluntário — ${form.nome}`,
    );
    window.open(
      `mailto:${EMAIL_SECRETARIA}?subject=${assunto}&body=${textoCodificado}`,
      "_blank",
    );

    setEnviado(true);
    setEnviando(false);
    setForm(formVazio);
  }

  return (
    <>
      <PageHeader
        title="Voluntários"
        description="Faça parte da equipe que serve e transforma vidas no Ministério Efraim"
      />
      {/* Por que servir */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold text-primary-900">
          Por que servir?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-primary-600">
          Servir é uma expressão prática do amor de Deus. Quando você coloca
          seus dons a serviço da igreja, você não só abençoa vidas — você também
          cresce espiritualmente, fortalece vínculos de comunhão e participa
          ativamente da missão que Deus tem para o Ministério Efraim. Não existe
          dom pequeno demais: cada área de serviço é essencial para o corpo de
          Cristo.
        </p>
      </section>

      {/* Cards de ministérios */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center font-display text-3xl font-semibold text-primary-900">
            Nossos Ministérios
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ministerios.map((ministerio) => {
              const Icone = ministerio.Icone;
              return (
                <Card
                  key={ministerio.id}
                  className="flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="flex flex-1 flex-col items-center p-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
                      <Icone className="h-8 w-8 text-primary-700" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-primary-900">
                      {ministerio.nome}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-primary-600">
                      {ministerio.descricao}
                    </p>
                    <button
                      onClick={() => selecionarMinisterio(ministerio.id)}
                      className="mt-5 w-full rounded-lg bg-gold-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gold-700"
                    >
                      Quero Servir
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {/* Formulário */}
      <section
        id="formulario-voluntarios"
        className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <h2 className="mb-8 text-center font-display text-3xl font-semibold text-primary-900">
          Inscreva-se
        </h2>

        {enviado && !erroSalvar && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 text-sm text-green-800">
            Inscrição enviada e salva com sucesso! O WhatsApp e o e-mail foram
            abertos para você confirmar o envio. Em breve nossa equipe entrará
            em contato.
          </div>
        )}

        {enviado && erroSalvar && (
          <div className="mb-6 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
            A inscrição foi enviada pelo WhatsApp/e-mail, mas houve um problema
            ao salvar no sistema. Por favor, confirme o envio pelo WhatsApp ou
            e-mail para garantir que sua inscrição chegue até nós.
          </div>
        )}

        <Card>
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-primary-700">
                  Nome completo
                </label>
                <input
                  required
                  type="text"
                  value={form.nome}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, nome: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-primary-700">
                    Telefone / WhatsApp
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.telefone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, telefone: e.target.value }))
                    }
                    placeholder="(11) 91234-5678"
                    className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-700">
                    E-mail
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-primary-700">
                    Idade
                  </label>
                  <input
                    required
                    type="number"
                    min={0}
                    value={form.idade}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, idade: e.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-700">
                    Ministério de interesse
                  </label>
                  <select
                    required
                    value={form.ministerio}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, ministerio: e.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
                  >
                    <option value="">Selecione...</option>
                    {ministerios.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-700">
                  Disponibilidade — dias da semana
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {disponibilidadesDias.map((dia) => (
                    <button
                      type="button"
                      key={dia}
                      onClick={() => alternarDia(dia)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                        form.dias.includes(dia)
                          ? "border-gold-600 bg-gold-600 text-white"
                          : "border-primary-200 text-primary-600 hover:border-primary-400"
                      }`}
                    >
                      {dia}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700">
                  Disponibilidade — horário
                </label>
                <input
                  type="text"
                  value={form.horario}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, horario: e.target.value }))
                  }
                  placeholder="Ex: manhãs, noites de domingo..."
                  className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-700">
                  Tempo de congregação
                </label>
                <input
                  required
                  type="text"
                  value={form.tempoCongregacao}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      tempoCongregacao: e.target.value,
                    }))
                  }
                  placeholder="Ex: 2 anos"
                  className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700">
                  Mensagem (opcional)
                </label>
                <textarea
                  rows={3}
                  value={form.mensagem}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, mensagem: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={enviando}
                className="w-full rounded-lg bg-gold-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-gold-700 disabled:opacity-60"
              >
                {enviando ? "Enviando..." : "Enviar inscrição"}
              </button>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
