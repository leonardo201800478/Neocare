import { StyleSheet, StatusBar } from 'react-native';

const DoctorsStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    backgroundColor: '#E8F5E9', // Fundo verde claro para um visual limpo
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#388E3C', // Verde escuro para título
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#1B5E20', // Verde para o subtítulo
    marginBottom: 24,
    textAlign: 'center',
  },
  infoBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  infoBox: {
    backgroundColor: '#A5D6A7', // Verde médio para caixas de informação
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
  },
  infoBoxTitle: {
    fontSize: 16,
    color: '#FFFFFF', // Texto branco
    marginBottom: 8,
    fontWeight: 'bold',
  },
  infoBoxValue: {
    fontSize: 20,
    color: '#FFFFFF', // Texto branco maior
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    padding: 12,
    backgroundColor: '#4CAF50', // Verde principal
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonSecondary: {
    width: '80%',
    padding: 12,
    backgroundColor: '#388E3C', // Verde mais escuro para botões secundários
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#4CAF50', // Borda verde
    color: '#000000', // Cor do texto preta
  },
  linkText: {
    color: '#007BFF', // Azul para links
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DoctorsStyles;
