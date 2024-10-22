import { ExpoConfig, ConfigContext } from '@expo/config';

interface CustomExpoConfig extends ExpoConfig {
  extra: {
    eas: {
      projectId: string;
    };
    supabaseUrl: string;
    supabaseAnonKey: string;
    supabaseServiceRoleKey: string;
    powersyncUrl: string;
  };
}

export default ({ config }: ConfigContext): CustomExpoConfig => {
  // Definindo as chaves diretamente no arquivo para produção
  const supabaseUrl = 'https://rixquulpyromqkdkgcmw.supabase.co';
  const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpeHF1dWxweXJvbXFrZGtnY213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxNDczMjksImV4cCI6MjA0MjcyMzMyOX0.bmlCKjs5gwyu1ZP3NNJxqZ-R-K-I0a_SdGwf-e_CYDU';
  const supabaseServiceRoleKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpeHF1dWxweXJvbXFrZGtnY213Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzE0NzMyOSwiZXhwIjoyMDQyNzIzMzI5fQ.vw66Zwg0CsP1iwr8a1tMqLzp-8FkgR9gep0UYSOl-YA';
  const powersyncUrl = 'https://67014fc87337c371e06b5e73.powersync.journeyapps.com';

  return {
    ...config,
    name: 'neocare',
    slug: 'neocare',
    version: '1.0.0',
    scheme: 'neocare',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#4A90E2',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.strife.neocare',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.strife.neocare',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/favicon.png',
    },
    plugins: ['expo-router', 'expo-secure-store'],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    extra: {
      eas: {
        projectId: '5f0ac4f3-105c-4b91-a118-6014cbc84b34',
      },
      supabaseUrl,
      supabaseAnonKey,
      supabaseServiceRoleKey,
      powersyncUrl,
    },
  };
};
