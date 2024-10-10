// app/styles/HomeScreenStyles.ts

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e6f7e1', // Fundo verde claro para uma aparência acolhedora
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2e7d32', // Verde escuro para destacar o título
  },
  input: {
    padding: 12,
    borderColor: '#bcd5c2', // Cor da borda suavizada para combinar com o fundo
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#000',
    fontSize: 16,
  },
  searchContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchIcon: {
    position: 'absolute',
    left: 20, // Ajuste para posicionar o ícone à esquerda
    zIndex: 1, // Coloca o ícone acima do TextInput
    marginTop: 30, // Ajuste para centralizar o ícone verticalmente
  },
  searchInput: {
    paddingLeft: 35, // Adiciona espaço para o ícone no lado esquerdo do texto
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
  },
  button: {
    backgroundColor: '#2e7d32', // Verde escuro para os botões principais
    padding: 14,
    borderRadius: 25,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  columnText: {
    fontSize: 16,
    color: '#333', // Cor escura para melhor contraste e leitura
    textAlign: 'left',
  },
  noResultsText: {
    color: '#777',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
});
