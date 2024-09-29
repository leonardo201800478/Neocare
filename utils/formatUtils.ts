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

// Função para formatar o número de telefone no padrão "+00-00-00000-0000"
export const formatPhoneNumber = (countryCode: string, phoneNumber: string) => {
  if (!countryCode || !phoneNumber) {
    return '';
  }

  // Removendo todos os caracteres não numéricos do telefone
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

  // Formatar o telefone no padrão +00-00-00000-0000
  return `${countryCode}-${cleanedPhoneNumber.slice(0, 2)}-${cleanedPhoneNumber.slice(2, 7)}-${cleanedPhoneNumber.slice(7)}`;
};

// Lista completa de códigos de países
export const countryCodes = [
  { code: '+1', country: 'Estado Unidos' },
  { code: '+7', country: 'Russia' },
  { code: '+20', country: 'Egito' },
  { code: '+27', country: 'Africa do Sul' },
  { code: '+30', country: 'Grecia' },
  { code: '+31', country: 'Holanda' },
  { code: '+32', country: 'Belgica' },
  { code: '+33', country: 'Franca' },
  { code: '+34', country: 'Espanha' },
  { code: '+36', country: 'Hungria' },
  { code: '+39', country: 'Italia' },
  { code: '+40', country: 'Romania' },
  { code: '+41', country: 'Suica' },
  { code: '+44', country: 'Reino Unido' },
  { code: '+45', country: 'Dinamarca' },
  { code: '+46', country: 'Suecia' },
  { code: '+47', country: 'Noruega' },
  { code: '+48', country: 'Polonia' },
  { code: '+49', country: 'Alemanha' },
  { code: '+51', country: 'Peru' },
  { code: '+52', country: 'Mexico' },
  { code: '+53', country: 'Cuba' },
  { code: '+54', country: 'Argentina' },
  { code: '+55', country: 'Brasil' },
  { code: '+56', country: 'Chile' },
  { code: '+57', country: 'Colombia' },
  { code: '+58', country: 'Venezuela' },
  { code: '+60', country: 'Malasia' },
  { code: '+61', country: 'Australia' },
  { code: '+81', country: 'Japao' },
  { code: '+82', country: 'Coreia do Sul' },
  { code: '+86', country: 'China' },
  { code: '+90', country: 'Turquia' },
  { code: '+91', country: 'India' }
  // Complete com outros países se necessário...
];
