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

  // Se o mês atual for anterior ao mês de nascimento ou se for o mesmo mês mas o dia for anterior, subtraímos 1 da idade
  if (meses < 0 || (meses === 0 && diaAtual < diaNascimento)) {
    idade--;
    meses = (meses + 12) % 12;
  }

  return `${idade} anos e ${meses} meses`;
};
