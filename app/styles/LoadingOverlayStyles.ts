// /app/styles/LoadingOverlayStyles.ts

import { StyleSheet } from 'react-native';

const LoadingStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default LoadingStyles;
