import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, PinchGestureHandler, State } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GraficosMeninas2a5() {
  const [scale, setScale] = useState(1); // Estado para controlar o zoom
  const router = useRouter();

  // Função de Zoom In
  const handleZoomIn = () => {
    setScale((prevScale) => (prevScale < 3 ? prevScale + 0.5 : prevScale)); // Limite de zoom até 3x
  };

  // Função de Zoom Out
  const handleZoomOut = () => {
    setScale((prevScale) => (prevScale > 1 ? prevScale - 0.5 : prevScale)); // Limite mínimo de zoom em 1x
  };

  const handlePinchEvent = (event: any) => {
    setScale(event.nativeEvent.scale);
  };

  const handlePinchStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      setScale(1); // Reseta o zoom ao fim do gesto de pinça
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <Text style={styles.title}>Gráfico Meninas 2 a 5 Anos</Text>

        {/* ScrollView horizontal e vertical */}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          horizontal
          bounces={false}
          maximumZoomScale={3}
          minimumZoomScale={1}>
          <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
            <PinchGestureHandler
              onGestureEvent={handlePinchEvent}
              onHandlerStateChange={handlePinchStateChange}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../assets/graficos/menina2-5.jpg')}
                  style={[styles.image, { transform: [{ scale }] }]}
                />
                <Image
                  source={require('../assets/graficos/menina2-5_2.jpg')}
                  style={[styles.image, { transform: [{ scale }] }]}
                />
                <Image
                  source={require('../assets/graficos/menina2-5_3.jpg')}
                  style={[styles.image, { transform: [{ scale }] }]}
                />
                <Image
                  source={require('../assets/graficos/menina2-5_4.jpg')}
                  style={[styles.image, { transform: [{ scale }] }]}
                />
              </View>
            </PinchGestureHandler>
          </ScrollView>
        </ScrollView>

        {/* Botões de Zoom e Voltar */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
            <FontAwesome name="search-plus" size={20} color="#fff" />
            <Text style={styles.zoomButtonText}>Zoom In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
            <FontAwesome name="search-minus" size={20} color="#fff" />
            <Text style={styles.zoomButtonText}>Zoom Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <FontAwesome name="arrow-left" size={20} color="#fff" />
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  image: {
    width: 800,
    height: 650,
    margin: 10,
    resizeMode: 'contain',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  zoomButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 30,
  },
  zoomButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 8,
  },
  backButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 30,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 8,
  },
});
