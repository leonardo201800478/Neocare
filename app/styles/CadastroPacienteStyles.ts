// app/styles/CadastroPacienteStyles.ts

import { StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Para permitir rolagem
    padding: 20,
    backgroundColor: '#98FB98', // Fundo verde claro
    alignItems: 'center',
  },
  safeAreaView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4B0082',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#4B0082',
  },
  inputSmall: {
    flex: 1,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#4B0082',
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4B0082',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    color: '#000000',
  },
  button: {
    width: '48%',
    backgroundColor: '#4B0082',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 10,
  },
});

export default styles;
