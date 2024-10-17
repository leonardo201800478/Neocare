import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

type Tab = {
  screen: string;
  icon: 'user-plus' | 'bar-chart' | 'search' | 'stethoscope' | 'user-md';
  label: string;
};

const CustomTabBar = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState<string>('home'); // Inicializa o 'home' como selecionado

  // Criar valores animados para cada aba
  const scalePatients = useSharedValue(1);
  const scaleGraficos = useSharedValue(1);
  const scaleHome = useSharedValue(1);
  const scaleScreens = useSharedValue(1);
  const scaleDoctors = useSharedValue(1);

  // Funções de estilo animado para cada aba
  const animatedStylePatients = useAnimatedStyle(() => ({
    transform: [{ scale: scalePatients.value }],
  }));
  const animatedStyleGraficos = useAnimatedStyle(() => ({
    transform: [{ scale: scaleGraficos.value }],
  }));
  const animatedStyleHome = useAnimatedStyle(() => ({
    transform: [{ scale: scaleHome.value }],
  }));
  const animatedStyleScreens = useAnimatedStyle(() => ({
    transform: [{ scale: scaleScreens.value }],
  }));
  const animatedStyleDoctors = useAnimatedStyle(() => ({
    transform: [{ scale: scaleDoctors.value }],
  }));

  const tabs: Tab[] = [
    { screen: 'patients', icon: 'user-plus', label: 'Pacientes' },
    { screen: 'graficos', icon: 'bar-chart', label: 'Gráficos' },
    { screen: 'home', icon: 'search', label: '' },
    { screen: 'screens', icon: 'stethoscope', label: 'Tratamentos' },
    { screen: 'doctors', icon: 'user-md', label: 'Perfil' },
  ];

  // Definir animação ao clicar em uma aba
  const handlePress = (tab: Tab, scaleValue: Animated.SharedValue<number>) => {
    scaleValue.value = withSpring(1.5, { damping: 2 }, () => {
      scaleValue.value = withSpring(1);
    });
    setSelectedTab(tab.screen);
    navigation.navigate(tab.screen as never);
  };

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handlePress(tabs[0], scalePatients)}
        accessibilityLabel={tabs[0].label}>
        <Animated.View style={animatedStylePatients}>
          <FontAwesome
            name={tabs[0].icon}
            size={24}
            color={selectedTab === tabs[0].screen ? '#00FA9A' : '#8e8e93'}
          />
        </Animated.View>
        <Text style={styles.label}>{tabs[0].label}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => handlePress(tabs[1], scaleGraficos)}
        accessibilityLabel={tabs[1].label}>
        <Animated.View style={animatedStyleGraficos}>
          <FontAwesome
            name={tabs[1].icon}
            size={24}
            color={selectedTab === tabs[1].screen ? '#00FA9A' : '#8e8e93'}
          />
        </Animated.View>
        <Text style={styles.label}>{tabs[1].label}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.centerTab}
        onPress={() => handlePress(tabs[2], scaleHome)}
        accessibilityLabel={tabs[2].label}>
        <Animated.View style={animatedStyleHome}>
          <FontAwesome
            name={tabs[2].icon}
            size={30}
            color={selectedTab === tabs[2].screen ? '#00FA9A' : '#8e8e93'}
          />
        </Animated.View>
        <Text style={styles.label}>{tabs[2].label}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => handlePress(tabs[3], scaleScreens)}
        accessibilityLabel={tabs[3].label}>
        <Animated.View style={animatedStyleScreens}>
          <FontAwesome
            name={tabs[3].icon}
            size={24}
            color={selectedTab === tabs[3].screen ? '#00FA9A' : '#8e8e93'}
          />
        </Animated.View>
        <Text style={styles.label}>{tabs[3].label}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => handlePress(tabs[4], scaleDoctors)}
        accessibilityLabel={tabs[4].label}>
        <Animated.View style={animatedStyleDoctors}>
          <FontAwesome
            name={tabs[4].icon}
            size={24}
            color={selectedTab === tabs[4].screen ? '#00FA9A' : '#8e8e93'}
          />
        </Animated.View>
        <Text style={styles.label}>{tabs[4].label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFACD',
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    borderTopWidth: 0,
    elevation: 5,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerTab: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  label: {
    fontSize: 12,
    color: '#8e8e93',
    paddingTop: 4,
  },
});

export default CustomTabBar;
