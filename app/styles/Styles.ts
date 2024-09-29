import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#151515',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#151515',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A700FF',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#A700FF',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#363636',
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
  },
  inputSmall: {
    flex: 1,
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#363636',
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 5,
  },
  pickerContainer: {
    flex: 1,
    marginBottom: 15,
    backgroundColor: '#363636',
    borderRadius: 10,
    overflow: 'hidden',
  },
  picker: {
    color: '#fff',
    fontSize: 16,
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: '#363636',
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
    backgroundColor: '#A700FF',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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

    color: '#fff',

    marginTop: 10,

  },

});

export default styles;
