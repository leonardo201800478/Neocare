import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

import styles from './styles/AttendanceStyles';
import { VitalInfo } from './types';
import { useAttendanceVital } from '../context/AttendanceVitalContext';

interface VitalInfoProps {
  data: VitalInfo;
  attendanceId: string;
  doctorId: string;
  patientId: string;
  onChange: (field: keyof VitalInfo, value: string) => void;
}

const VitalInfoForm: React.FC<VitalInfoProps> = ({
  data,
  attendanceId,
  doctorId,
  patientId,
  onChange,
}) => {
  const { createVitalSigns } = useAttendanceVital();
  const router = useRouter();

  const handleSaveVitalInfo = async () => {
    if (!attendanceId || !doctorId || !patientId) {
      Alert.alert('Erro', 'IDs de atendimento, médico ou paciente não encontrados.');
      return;
    }

    try {
      const response = await createVitalSigns(
        {
          peso_kg: data.peso_kg,
          comprimento_cm: data.comprimento_cm,
          perimetro_cefalico_cm: data.perimetro_cefalico_cm,
          numero_respiracoes_por_minuto: data.numero_respiracoes_por_minuto,
        },
        attendanceId,
        doctorId
      );

      if (response.error) {
        throw new Error(response.error);
      }

      Alert.alert('Sucesso', 'Sinais vitais salvos com sucesso!');
      router.push({
        pathname: '/attendences/GeneralSymptomsForm',
        params: { attendanceId, doctorId, patientId },
      });
    } catch (error) {
      console.error('Erro ao salvar sinais vitais:', error);
      Alert.alert('Erro', 'Erro ao salvar sinais vitais.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Peso (kg):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 0.560 kg"
        value={(Number(data.peso_kg) * 1000).toString()}
        onChangeText={(text) => {
          if (!isNaN(Number(text))) {
            const pesoEmKg = (Number(text) / 1000).toFixed(3);
            onChange('peso_kg', pesoEmKg);
          }
        }}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Comprimento (cm):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 150.5"
        value={data.comprimento_cm}
        onChangeText={(text) => {
          const formattedText = text.replace(',', '.');
          if (!isNaN(Number(formattedText))) {
            onChange('comprimento_cm', formattedText);
          }
        }}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Perímetro Cefálico (cm):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 35.0"
        value={data.perimetro_cefalico_cm}
        onChangeText={(text) => {
          const formattedText = text.replace(',', '.');
          if (!isNaN(Number(formattedText))) {
            onChange('perimetro_cefalico_cm', formattedText);
          }
        }}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Número de Respirações por Minuto:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 18"
        value={data.numero_respiracoes_por_minuto}
        onChangeText={(text) => {
          if (/^\d*$/.test(text)) {
            onChange('numero_respiracoes_por_minuto', text);
          }
        }}
        keyboardType="numeric"
      />

      <Button title="Salvar Sinais Vitais e Continuar" onPress={handleSaveVitalInfo} />
    </View>
  );
};

export default VitalInfoForm;
