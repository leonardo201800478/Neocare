// app/utils/idadeCalculator.ts

export const calcularIdade = (dataNasc: Date, p0: string) => {
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  const mesAtual = hoje.getMonth();
  const diaAtual = hoje.getDate();

  const anoNascimento = dataNasc.getFullYear();
  const mesNascimento = dataNasc.getMonth();
  const diaNascimento = dataNasc.getDate();

  let idade = anoAtual - anoNascimento;
  let meses = mesAtual - mesNascimento;
  let dias = diaAtual - diaNascimento;

  // Ajusta o mês e ano se necessário
  if (meses < 0 || (meses === 0 && dias < 0)) {
    idade--;
    meses += 12;
  }

  // Ajusta os dias e os meses se necessário
  if (dias < 0) {
    meses--;
    // Calcula quantos dias havia no mês anterior
    const diasNoMesAnterior = new Date(anoAtual, mesAtual, 0).getDate();
    dias += diasNoMesAnterior;
  }

  // Corrige o cálculo dos meses caso tenhamos subtraído acima
  if (meses < 0) {
    meses += 12;
    idade--;
  }

  return `${idade} anos, ${meses} meses e ${dias} dias`;
};
