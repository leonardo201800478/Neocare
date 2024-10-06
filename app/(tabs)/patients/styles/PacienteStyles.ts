import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#98FB98', // Fundo verde claro
    alignItems: 'center',
  },
  safeAreaView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#98FB98', // Fundo verde claro
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
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4B0082', // Roxo
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32', // Verde escuro para o subcabeçalho
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#4B0082',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#4B0082',
  },
  inputSmall: {
    width: '48%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#4B0082',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  pickerContainer: {
    width: '45%',
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
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    width: '48%',
    backgroundColor: '#4B0082',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonVaccine: {
    flex: 1,
    backgroundColor: '#FFA500', // Laranja suave para o botão de vacinas
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  buttonConsulta: {
    flex: 1,
    backgroundColor: '#66BB6A', // Tom médio de verde para botão de consulta
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  buttonDelete: {
    flex: 1,
    backgroundColor: '#D32F2F', // Vermelho suave para destacar a exclusão
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  buttonHome: {
    backgroundColor: '#4CAF50', // Verde para o botão de voltar para Home
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(46, 125, 50, 0.5)', // Transparência verde para o overlay de carregamento
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#98FB98', // Fundo verde claro para manter a consistência
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 10,
  },
});

export default styles;
