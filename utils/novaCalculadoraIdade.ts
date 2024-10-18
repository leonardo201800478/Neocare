export const calcularIdadeMesesAnos = (
  dataNasc: Date,
  birth_date: string
): { anos: number; meses: number } => {
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  const mesAtual = hoje.getMonth();
  const diaAtual = hoje.getDate();

  const anoNascimento = dataNasc.getFullYear();
  const mesNascimento = dataNasc.getMonth();
  const diaNascimento = dataNasc.getDate();

  let idadeAnos = anoAtual - anoNascimento;
  let idadeMeses = mesAtual - mesNascimento;

  if (idadeMeses < 0 || (idadeMeses === 0 && diaAtual < diaNascimento)) {
    idadeAnos--;
    idadeMeses += 12;
  }

  return { anos: idadeAnos, meses: idadeMeses };
};
