// utils/formatUtils.ts

// Função para formatar a data de nascimento
export const formatDateForDatabase = (date: string) => {
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`; // aaaa-mm-dd
};

// Função para adicionar máscara ao CPF (xxx.xxx.xxx-xx)
export const formatCPF = (cpf: string) => {
  return cpf
    .replace(/\D/g, '') // Remove caracteres não numéricos
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

// Função para remover a máscara do CPF (apenas números)
export const removeCPFMask = (cpf: string) => {
  return cpf.replace(/\D/g, ''); // Remove tudo que não for número
};

// Função para formatar o CEP (xx.xxx-xxx)
export const formatCEP = (cep: string) => {
  return cep
    .replace(/\D/g, '') // Remove caracteres não numéricos
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,3})$/, '$1-$2');
};

// Função para remover a máscara do CEP
export const removeCEPFormat = (cep: string) => {
  return cep.replace(/\D/g, '');
};
