Prepare o Ambiente para developer build.
https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated&mode=development-build

Clone o projeto;

Execute a instalação das dependências com npm install, ou yarn install;

Compile o projeto com:
npx expo run:android ou npx expo run:iOS;


Possível erro na compilação;

Remover ou substituir o método useDefaultAndroidSdkVersions(): Abra o arquivo 'J:\neocare-app\node_modules\expo-splash-screen\android\build.gradle' e localize a linha que contém o método useDefaultAndroidSdkVersions(). Esse método parece obsoleto ou não compatível com a versão do Gradle/SDK que você está usando.

Para corrigir, comente ou remova a linha com esse método, ou, caso haja documentação de Expo ou Gradle sobre a nova abordagem, substitua o método.

groovy Copiar código // useDefaultAndroidSdkVersions() // Comente ou remova esta linha


Necessário o Node.js LTS instalado.
Necessário o JAVA SDK 17 instalado com sua variável de ambiente configurada.
Android Studio com variável de ambiente configurada;
Pixel 3a API 34 com Android 14 configurados no emulador;

Banco de dados local;
Autenticação, Database e Storage no Supabase (nuvem);
First-Local configurado pelo Powersync;