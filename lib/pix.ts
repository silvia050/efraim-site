// Gera o "payload" no padrão BR Code (Banco Central) para PIX estático,
// que os apps de banco reconhecem ao escanear e preenchem os dados automaticamente.

function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function campoEMV(id: string, valor: string): string {
  const tamanho = valor.length.toString().padStart(2, "0");
  return `${id}${tamanho}${valor}`;
}

// Remove acentos e caracteres especiais, pois o padrão BR Code exige texto ASCII simples
function limparTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .toUpperCase();
}

type DadosPix = {
  chave: string;
  nomeFavorecido: string;
  cidade: string;
  descricao?: string;
};

export function gerarPayloadPix({
  chave,
  nomeFavorecido,
  cidade,
  descricao,
}: DadosPix): string {
  const payloadFormatIndicator = campoEMV("00", "01");
  const pointOfInitiation = campoEMV("01", "11"); // 11 = estático (reutilizável)

  const guiPix = campoEMV("00", "br.gov.bcb.pix");
  const chavePix = campoEMV("01", chave);
  const descricaoPix = descricao
    ? campoEMV("02", limparTexto(descricao).slice(0, 40))
    : "";
  const merchantAccountInfo = campoEMV(
    "26",
    `${guiPix}${chavePix}${descricaoPix}`,
  );

  const merchantCategoryCode = campoEMV("52", "0000");
  const transactionCurrency = campoEMV("53", "986"); // 986 = Real (BRL)
  const countryCode = campoEMV("58", "BR");
  const merchantName = campoEMV("59", limparTexto(nomeFavorecido).slice(0, 25));
  const merchantCity = campoEMV("60", limparTexto(cidade).slice(0, 15));

  const additionalDataField = campoEMV("62", campoEMV("05", "***"));

  const payloadSemCRC =
    payloadFormatIndicator +
    pointOfInitiation +
    merchantAccountInfo +
    merchantCategoryCode +
    transactionCurrency +
    countryCode +
    merchantName +
    merchantCity +
    additionalDataField +
    "6304";

  return payloadSemCRC + crc16(payloadSemCRC);
}

// Monta a URL de uma imagem de QR Code a partir do payload PIX
export function urlQrCodePix(payload: string): string {
  const tamanho = "220x220";
  return `https://api.qrserver.com/v1/create-qr-code/?size=${tamanho}&data=${encodeURIComponent(
    payload,
  )}`;
}
