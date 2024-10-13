// app/allergies/index.tsx

import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles/AllergiesStyles';

const AllergiesIndex = () => {
  const router = useRouter();

  const handleViewAllergiesDetails = () => {
    router.push('/allergies/AllergiesDetails');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alergias</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleViewAllergiesDetails}>
          <Text style={styles.buttonText}>Ver Detalhes das Alergias</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AllergiesIndex;
