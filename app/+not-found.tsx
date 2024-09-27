// app/+not-found.tsx

import { Link, Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
      <View style={styles.container}>
<<<<<<< HEAD
        <Link href="/auth/">Vá para a tela de Login</Link>
=======
        <Link href="/auth/Login">Vá para a tela de Login</Link>
>>>>>>> 183f846fe8588ec1ea96a15ef666119c2aee64dc
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
