// components/CepInput.tsx

import React from 'react';
import { TextInput, Alert, StyleSheet } from 'react-native';

import { formatCEP, removeCEPFormat } from '../utils/formatUtils';

const CEPInput = ({
  cep,
  setCep,
  onAddressFound,
}: {
  cep: string;
  setCep: (cep: string) => void;
  onAddressFound: (data: any) => void;
}) => {
  const handleCepChange = async (value: string) => {
    const formattedCep = formatCEP(value);
    setCep(formattedCep);

    const cleanCep = removeCEPFormat(formattedCep);

    // Verifica se o CEP tem 8 caracteres e é composto apenas por números
    if (cleanCep.length === 8 && /^\d{8}$/.test(cleanCep)) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();

        if (data.erro) {
          Alert.alert('Erro', 'CEP não encontrado. Verifique e tente novamente.');
        } else {
          onAddressFound(data);
        }
      } catch {
        Alert.alert('Erro', 'Não foi possível buscar o endereço. Verifique sua conexão.');
      }
    }
  };

  return (
    <TextInput
      placeholder="CEP"
      value={cep}
      style={styles.input}
      onChangeText={handleCepChange}
      keyboardType="numeric"
    />
  );
};

export default CEPInput;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
});
