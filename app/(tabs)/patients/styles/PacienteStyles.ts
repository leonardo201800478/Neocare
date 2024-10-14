import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#98FB98', // Fundo verde claro
    alignItems: 'center',
  },
  safeAreaView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 20,
    backgroundColor: '#98FB98', // Fundo verde claro
  },
  detailsContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#A5D6A7', // Verde suave
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#66BB6A', // Borda em tom verde
    shadowColor: '#388E3C', // Sombra verde escuro
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  detailItem: {
    fontSize: 18,
    color: '#1B5E20', // Verde escuro
    marginBottom: 10,
    textAlign: 'left', // Texto alinhado à esquerda
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
  updateText: {
    fontSize: 16,
    color: '#1B5E20',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  buttonConsulta: {
    flex: 1,
    backgroundColor: '#66BB6A', // Verde médio
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  buttonVaccine: {
    flex: 1,
    backgroundColor: '#66BB6A', // Verde médio
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  buttonAllergy: {
    flex: 1,
    backgroundColor: '#66BB6A', // Verde médio
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  buttonMedicament: {
    flex: 1,
    backgroundColor: '#66BB6A', // Verde médio
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  buttonDelete: {
    flex: 1,
    backgroundColor: '#D32F2F', // Vermelho para deletar
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  buttonHome: {
    backgroundColor: '#4CAF50', // Verde para o botão Home
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  allergiesContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
    padding: 20,
    backgroundColor: '#A5D6A7', // Fundo verde para alergias
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#66BB6A',
    shadowColor: '#388E3C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  noAllergiesText: {
    fontSize: 16,
    color: '#1B5E20',
    textAlign: 'center',
    marginTop: 10,
  },
  allergyItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#98FB98', // Fundo verde
  },
});

export default styles;
