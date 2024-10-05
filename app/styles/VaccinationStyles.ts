// app/styles/VaccinationStyles.ts

import { StyleSheet } from 'react-native';

const VaccinationStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#e6e6e6',
    paddingHorizontal: 15,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  vaccineName: {
    flex: 2,
    fontSize: 16,
    color: '#555',
    textAlign: 'left',
    paddingRight: 10,
  },
  doseNumber: {
    flex: 1,
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#008000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VaccinationStyles;
