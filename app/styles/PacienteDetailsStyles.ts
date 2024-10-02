import { StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8F5E9', // Fundo em um tom suave de verde
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32', // Tom de verde mais escuro para destaque
    textAlign: 'center',
    marginBottom: 30,
  },
  safeAreaView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#C8E6C9', // Fundo verde claro para a SafeAreaView
  },
  detailsContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#A5D6A7', // Verde suave para o fundo do container de detalhes
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#66BB6A', // Borda em tom um pouco mais escuro de verde
    shadowColor: '#388E3C', // Sombra em verde escuro
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  detailItem: {
    fontSize: 18,
    color: '#1B5E20', // Texto em verde mais escuro
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonDelete: {
    flex: 1,
    backgroundColor: '#D32F2F', // Vermelho suave para destacar a exclusão
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonConsulta: {
    flex: 1,
    backgroundColor: '#66BB6A', // Tom médio de verde para botão de consulta
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonVaccine: {
    flex: 1,
    backgroundColor: '#FFA500', // Verde suave para o botão de vacinas
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFFFFF', // Texto branco para bom contraste nos botões
    fontSize: 16,
    fontWeight: 'bold',
  },
  vaccinesContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#A5D6A7', // Verde suave para o fundo do container de vacinas
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#66BB6A', // Borda em verde um pouco mais escuro
    shadowColor: '#388E3C', // Sombra em verde escuro
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32', // Verde escuro para o subcabeçalho
    marginBottom: 15,
  },
});

export default styles;
