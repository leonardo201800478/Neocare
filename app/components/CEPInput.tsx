// components/CEPInput.tsx
import React, { useState } from 'react';
import { TextInput, Alert } from 'react-native';
import { formatCEP, removeCEPFormat } from '../utils/formatUtils';

const CEPInput = ({ onAddressFound }: { onAddressFound: (data: any) => void }) => {
  const [cep, setCep] = useState('');

  const handleCepChange = async (value: string) => {
    const formattedCep = formatCEP(value);
    setCep(formattedCep);

    if (removeCEPFormat(formattedCep).length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${removeCEPFormat(formattedCep)}/json/`
        );
        const data = await response.json();

        if (data.erro) {
          Alert.alert('Erro', 'CEP inválido.');
        } else {
          onAddressFound(data);
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível buscar o endereço.');
      }
    }
  };

  return (
    <TextInput
      placeholder="CEP"
      value={cep}
      onChangeText={handleCepChange}
      keyboardType="numeric"
    />
  );
};

export default CEPInput;
