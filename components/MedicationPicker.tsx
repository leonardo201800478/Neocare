import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MedicationPicker = ({ onSelect }: { onSelect: (medicamento: string) => void }) => {
  const [selectedMedication, setSelectedMedication] = useState('');

  const handleSelect = (itemValue: string) => {
    setSelectedMedication(itemValue);
    onSelect(itemValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione o Medicamento:</Text>
      <Picker selectedValue={selectedMedication} style={styles.picker} onValueChange={handleSelect}>
        <Picker.Item label="Amoxicilina" value="Amoxicilina" />
        <Picker.Item label="Paracetamol" value="Paracetamol" />
        <Picker.Item label="Ibuprofeno" value="Ibuprofeno" />
        <Picker.Item label="Cefalexina" value="Cefalexina" />
        {/* Adicione mais opções conforme necessário */}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default MedicationPicker;
