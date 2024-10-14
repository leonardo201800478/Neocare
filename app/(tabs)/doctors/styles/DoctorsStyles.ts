// app/(tabs)/doctors/styles/DoctorsStyles.ts

import { StyleSheet, StatusBar } from 'react-native';

const DoctorsStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#388E3C',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#1B5E20',
    marginBottom: 24,
    textAlign: 'center',
  },
  infoBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  infoBox: {
    backgroundColor: '#A5D6A7', 
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
  },
  infoBoxTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  infoBoxValue: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    padding: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonSecondary: {
    width: '80%',
    padding: 12,
    backgroundColor: '#388E3C',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#4CAF50',
    color: '#000000',
  },
  linkText: {
    color: '#007BFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  loadingOverlay: {
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DoctorsStyles;
