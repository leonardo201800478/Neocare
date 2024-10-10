// app/(tabs)/doctors/_layout.tsx

import { Slot } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import DoctorsStyles from './styles/DoctorsStyles';

export default function DoctorsLayout() {
  return (
    <View style={DoctorsStyles.container}>
      <Slot />
    </View>
  );
}
