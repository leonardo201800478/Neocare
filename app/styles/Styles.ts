import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Verde claro para a área segura
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#E8F5E9', // Verde claro para o fundo principal
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32', // Verde escuro para o título
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#388E3C', // Verde médio para subtítulos
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#FFFFFF', // Branco para o campo de entrada
    borderRadius: 10,
    color: '#2E7D32', // Verde escuro para o texto
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#A5D6A7', // Verde suave para as bordas dos inputs
  },
  inputSmall: {
    flex: 1,
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#FFFFFF', // Branco para campos de entrada pequenos
    borderRadius: 10,
    color: '#2E7D32', // Verde escuro para o texto
    fontSize: 16,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#A5D6A7', // Verde suave para bordas
  },
  inputMultiline: {
    width: '100%',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#F1F8E9', // Verde muito claro para diferenciar campos multilinha
    borderRadius: 12,
    color: '#2E7D32', // Verde escuro para o texto
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#81C784', // Verde para as bordas dos inputs multilinha
    textAlignVertical: 'top',
  },
  pickerContainer: {
    flex: 1,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    overflow: 'hidden',
  },
  picker: {
    color: '#2E7D32',
    fontSize: 16,
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    backgroundColor: '#4CAF50', // Verde para os botões principais
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFFFFF', // Branco para o texto dos botões
    fontSize: 16,
    fontWeight: 'bold',
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
  loadingText: {
    color: '#FFFFFF', // Branco para o texto de carregamento
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C8E6C9', // Verde muito claro para o fundo de carregamento
  },
  attendanceContainer: {
    padding: 20,
    backgroundColor: '#A5D6A7', // Verde suave para o container de atendimento
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#81C784',
  },
  infoContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#C8E6C9', // Verde claro para o container de informações
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#81C784',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  detailsContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#C8E6C9', // Verde claro para o container de detalhes
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#81C784',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32', // Verde escuro para o título
    marginBottom: 15,
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  buttonDelete: {
    backgroundColor: '#D32F2F', // Vermelho escuro para o botão de exclusão
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonConsulta: {
    backgroundColor: '#388E3C', // Verde médio para o botão de consulta
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonVaccine: {
    backgroundColor: '#FFA000', // Laranja para o botão de vacinação
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  detailItem: {
    fontSize: 18,
    color: '#2E7D32', // Verde escuro para itens de detalhe
    marginBottom: 10,
  },
});

export default styles;
