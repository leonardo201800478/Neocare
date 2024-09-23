// app/patient/_layout.tsx
import { Slot } from 'expo-router';
import { View } from 'react-native';

const PatientLayout = () => {
  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: '#e8f5e9' }}>
      <Slot />
    </View>
  );
};

export default PatientLayout;
