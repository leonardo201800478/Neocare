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
  { code: '+1', country: 'United States' },
  { code: '+7', country: 'Russia' },
  { code: '+20', country: 'Egypt' },
  { code: '+27', country: 'South Africa' },
  { code: '+30', country: 'Greece' },
  { code: '+31', country: 'Netherlands' },
  { code: '+32', country: 'Belgium' },
  { code: '+33', country: 'France' },
  { code: '+34', country: 'Spain' },
  { code: '+36', country: 'Hungary' },
  { code: '+39', country: 'Italy' },
  { code: '+40', country: 'Romania' },
  { code: '+41', country: 'Switzerland' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+45', country: 'Denmark' },
  { code: '+46', country: 'Sweden' },
  { code: '+47', country: 'Norway' },
  { code: '+48', country: 'Poland' },
  { code: '+49', country: 'Germany' },
  { code: '+51', country: 'Peru' },
  { code: '+52', country: 'Mexico' },
  { code: '+53', country: 'Cuba' },
  { code: '+54', country: 'Argentina' },
  { code: '+55', country: 'Brazil' },
  { code: '+56', country: 'Chile' },
  { code: '+57', country: 'Colombia' },
  { code: '+58', country: 'Venezuela' },
  { code: '+60', country: 'Malaysia' },
  { code: '+61', country: 'Australia' },
  { code: '+62', country: 'Indonesia' },
  { code: '+63', country: 'Philippines' },
  { code: '+64', country: 'New Zealand' },
  { code: '+65', country: 'Singapore' },
  { code: '+66', country: 'Thailand' },
  { code: '+81', country: 'Japan' },
  { code: '+82', country: 'South Korea' },
  { code: '+84', country: 'Vietnam' },
  { code: '+86', country: 'China' },
  { code: '+90', country: 'Turkey' },
  { code: '+91', country: 'India' },
  { code: '+92', country: 'Pakistan' },
  { code: '+93', country: 'Afghanistan' },
  { code: '+94', country: 'Sri Lanka' },
  { code: '+95', country: 'Myanmar' },
  { code: '+98', country: 'Iran' },
  { code: '+211', country: 'South Sudan' },
  { code: '+212', country: 'Morocco' },
  { code: '+213', country: 'Algeria' },
  { code: '+216', country: 'Tunisia' },
  { code: '+218', country: 'Libya' },
  { code: '+220', country: 'Gambia' },
  { code: '+221', country: 'Senegal' },
  { code: '+222', country: 'Mauritania' },
  { code: '+223', country: 'Mali' },
  { code: '+224', country: 'Guinea' },
  { code: '+225', country: 'Ivory Coast' },
  { code: '+226', country: 'Burkina Faso' },
  { code: '+227', country: 'Niger' },
  { code: '+228', country: 'Togo' },
  { code: '+229', country: 'Benin' },
  { code: '+230', country: 'Mauritius' },
  { code: '+231', country: 'Liberia' },
  { code: '+232', country: 'Sierra Leone' },
  { code: '+233', country: 'Ghana' },
  { code: '+234', country: 'Nigeria' },
  { code: '+235', country: 'Chad' },
  { code: '+236', country: 'Central African Republic' },
  { code: '+237', country: 'Cameroon' },
  { code: '+238', country: 'Cape Verde' },
  { code: '+239', country: 'Sao Tome and Principe' },
  { code: '+240', country: 'Equatorial Guinea' },
  { code: '+241', country: 'Gabon' },
  { code: '+242', country: 'Republic of the Congo' },
  { code: '+243', country: 'Democratic Republic of the Congo' },
  { code: '+244', country: 'Angola' },
  { code: '+245', country: 'Guinea-Bissau' },
  { code: '+246', country: 'British Indian Ocean Territory' },
  { code: '+247', country: 'Ascension Island' },
  { code: '+248', country: 'Seychelles' },
  { code: '+249', country: 'Sudan' },
  { code: '+250', country: 'Rwanda' },
  { code: '+251', country: 'Ethiopia' },
  { code: '+252', country: 'Somalia' },
  { code: '+253', country: 'Djibouti' },
  { code: '+254', country: 'Kenya' },
  { code: '+255', country: 'Tanzania' },
  { code: '+256', country: 'Uganda' },
  { code: '+257', country: 'Burundi' },
  { code: '+258', country: 'Mozambique' },
  { code: '+260', country: 'Zambia' },
  { code: '+261', country: 'Madagascar' },
  { code: '+262', country: 'Réunion' },
  { code: '+263', country: 'Zimbabwe' },
  { code: '+264', country: 'Namibia' },
  { code: '+265', country: 'Malawi' },
  { code: '+266', country: 'Lesotho' },
  { code: '+267', country: 'Botswana' },
  { code: '+268', country: 'Eswatini' },
  { code: '+269', country: 'Comoros' },
  { code: '+290', country: 'Saint Helena' },
  { code: '+291', country: 'Eritrea' },
  // Complete com outros países se necessário...
];
