import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E8F5E9', // Verde claro para o fundo
    padding: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 40,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E7D32', // Verde escuro
    marginBottom: 20,
  },
  patientName: {
    fontSize: 20,
    color: '#388E3C', // Verde médio para o nome do paciente
    marginBottom: 10,
  },
  updateText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  allergiesContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo branco com leve transparência
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B5E20', // Verde mais escuro
    marginBottom: 10,
  },
  allergyItem: {
    fontSize: 16,
    color: '#4CAF50', // Verde claro para os itens de alergia confirmados
    marginBottom: 8,
  },
  noAllergiesText: {
    fontSize: 16,
    color: '#757575',
    marginTop: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#2E7D32', // Verde escuro para os botões
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;
