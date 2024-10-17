import { StyleSheet, StatusBar, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#E8F5E9',
  },
  scrollView: {
    flexGrow: 1,
    padding: 16,
  },
  detailsContainer: {
    backgroundColor: '#C8E6C9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  detailItem: {
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 10,
  },
  updateText: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#F1F8E9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#AED581',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  CardItem: {
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#A5D6A7',
    borderRadius: 5,
  },
  allergiesContainer: {
    backgroundColor: '#F1F8E9', // Fundo leve para o container de alergias
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#AED581', // Borda verde clara para o container
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  allergyItem: {
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#A5D6A7',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 7,
  },
  buttonContainerFinal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 30, // Espaço adicional até a barra de navegação
  },
  button: {
    width: width * 0.4,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
  buttonPrimary: {
    backgroundColor: '#4CAF50',
  },
  buttonSecondary: {
    backgroundColor: '#FF9800',
  },
  buttonTertiary: {
    backgroundColor: '#2196F3',
  },
  buttonDanger: {
    backgroundColor: '#F44336',
  },
  noAllergiesText: {
    fontSize: 16,
    color: '#2E7D32',
    textAlign: 'center',
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
  },
  buttonHome: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  }
});

export default styles;
