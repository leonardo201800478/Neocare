import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#005F9E',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  linkText: {
    textAlign: 'center',
    color: '#005F9E',
    marginTop: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  // Estilo do loadingOverlay adicionado
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject, // Ocupa a tela inteira
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo semitransparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 18,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Ocupa a tela inteira
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
