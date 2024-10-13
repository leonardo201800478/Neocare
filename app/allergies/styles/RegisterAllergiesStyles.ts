import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Cor de fundo para a tela
  },
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    flexGrow: 1, // Garante que o conteúdo preencha o espaço disponível e permite a rolagem
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333333',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#cccccc',
    backgroundColor: '#f9f9f9',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 30,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#28a745',
  },
  buttonCancel: {
    backgroundColor: '#dc3545',
  },
  buttonDisabled: {
    backgroundColor: '#ced4da',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonLabelDisabled: {
    color: '#ffffff',
  },

});

export default styles;
