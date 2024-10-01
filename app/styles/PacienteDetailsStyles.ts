import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#151515', // Mantendo o mesmo background padrão
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A700FF',
    textAlign: 'center',
    marginBottom: 30,
  },
  detailsContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  detailItem: {
    fontSize: 18,
    color: '#E0E0E0',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonDelete: {
    flex: 1,
    backgroundColor: '#ff5252',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonConsulta: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonVaccine: {
    flex: 1,
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  vaccinesContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#282828',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A700FF',
    marginBottom: 15,
  },
});

export default styles;
