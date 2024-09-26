// app/styles/CadastroPacienteStyles.ts
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
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4B0082', // Roxo
    textAlign: 'center',
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
    justifyContent: 'space-between',
    width: '100%',
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