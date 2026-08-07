"use client";

import { useState } from "react";
import Image from "next/image";
import { PageHeader } from "@/components/sections/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { gerarPayloadPix, urlQrCodePix } from "@/lib/pix";

type SecaoPix = {
  titulo: string;
  descricao: string;
  chavePix: string;
  dados: { label: string; valor: string }[];
};

const NOME_FAVORECIDO = "Ministerio Efraim";
const CIDADE = "Carapicuiba";

const secoes: SecaoPix[] = [
  {
    titulo: "Dízimos e ofertas",
    descricao:
      "Contribua com dízimos, ofertas e doações para sustentar a obra do Ministério Efraim.",
    chavePix: "15.248.022/0001-42",
    dados: [
      { label: "Favorecido", valor: "Ministério Efraim Igreja Em Células" },
      { label: "CNPJ", valor: "15.248.022/0001-42" },
      { label: "Instituição", valor: "PagSeguro Internet IP S.A." },
      { label: "Tipo de conta", valor: "Conta Pagamento" },
      { label: "Agência", valor: "0001" },
      { label: "Conta", valor: "751826025" },
    ],
  },
  {
    titulo: "Pagamento de eventos",
    descricao:
      "Use esta chave para pagamentos de inscrições e participações em eventos do Ministério Efraim.",
    chavePix: "eventos.efraim@yahoo.com",
    dados: [
      { label: "Favorecido", valor: "Ministério Efraim Igreja Em Células" },
      { label: "Instituição", valor: "PagSeguro Internet IP S.A." },
      { label: "Tipo de conta", valor: "Conta Pagamento" },
      { label: "Agência", valor: "0001" },
      { label: "Conta", valor: "751826025" },
    ],
  },
];

function CartaoPix({ secao }: { secao: SecaoPix }) {
  const [copiado, setCopiado] = useState(false);

  function copiarChave() {
    navigator.clipboard.writeText(secao.chavePix);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  const payloadPix = gerarPayloadPix({
    chave: secao.chavePix,
    nomeFavorecido: NOME_FAVORECIDO,
    cidade: CIDADE,
    descricao: secao.titulo,
  });
  const qrCodeUrl = urlQrCodePix(payloadPix);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 sm:p-8">
        <h3 className="font-display text-xl font-semibold text-primary-900">
          {secao.titulo}
        </h3>
        <p className="mt-1 text-sm text-primary-600">{secao.descricao}</p>

        <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <Image
            src={qrCodeUrl}
            alt={`QR Code Pix para ${secao.titulo}`}
            width={160}
            height={160}
            unoptimized
            className="rounded-lg border border-primary-100"
          />

          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-primary-500">
              Chave Pix
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
              <code className="flex-1 rounded-lg bg-primary-50 px-4 py-3 text-sm text-primary-900 break-all">
                {secao.chavePix}
              </code>
              <button
                onClick={copiarChave}
                className="rounded-lg bg-gold-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-gold-700"
              >
                {copiado ? "Copiado!" : "Copiar chave"}
              </button>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-primary-500">
              💡 Ao pagar, inclua seu nome na mensagem do PIX para facilitar a
              identificação pela tesouraria.
            </p>
          </div>
        </div>

        <p className="mt-6 text-xs font-medium uppercase tracking-wide text-primary-500">
          Dados bancários
        </p>
        <dl className="mt-2 divide-y divide-primary-100">
          {secao.dados.map((item) => (
            <div
              key={item.label}
              className="flex justify-between gap-4 py-3 text-sm"
            >
              <dt className="font-medium text-primary-600">{item.label}</dt>
              <dd className="text-right text-primary-900">{item.valor}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

export default function ContribuaPage() {
  return (
    <>
      <PageHeader
        title="Contribua"
        description="Sua contribuição ajuda a sustentar a obra do Ministério Efraim"
      />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {secoes.map((secao) => (
            <CartaoPix key={secao.titulo} secao={secao} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm leading-relaxed text-primary-600">
          Toda contribuição é voluntária. Que Deus abençoe sua generosidade!
        </p>
      </div>
    </>
  );
}
