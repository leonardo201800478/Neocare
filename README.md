# NEOCARE - Aplicativo Mobile para Atendimento Neonatal

## Descrição

NEOCARE é uma aplicação mobile desenvolvida para facilitar o atendimento neonatal, especialmente em regiões remotas e carentes. Utilizando tecnologias como **React Native**, **Expo**, **TypeScript**, e **Supabase**, o projeto visa fornecer suporte para médicos e profissionais da saúde ao permitir acesso às informações de pacientes, mesmo em ambientes offline. A solução foi desenvolvida como parte de um projeto acadêmico com o objetivo de auxiliar no combate à mortalidade infantil.

## Estrutura do Projeto

```text
app/
  (tabs)/
    about/
      _layout.tsx
      index.tsx
  allergies/
    styles/
      AllergiesDetailStyles.ts
      AllergiesStyles.ts
    _layout.tsx
    AllergiesDetails.tsx
    RegisterAllergies.tsx
    index.tsx
  attendances/
    styles/
      AttendanceStyles.ts
    _layout.tsx
    AttendanceDetails.tsx
    AttendanceSummary.tsx
    BasicInfoForm.tsx
    GeneralSymptomsForm.tsx
    NutritionDevelopmentForm.tsx
    RegisterAttendanceStep1.tsx
    RegisterAttendanceStep2.tsx
    RegisterAttendanceStep3.tsx
    RegisterAttendanceStep4.tsx
    VitalInfoForm.tsx
    types.ts
  auth/
    styles/
      authStyles.ts
    _layout.tsx
    index.tsx
    Register.tsx
    reset-password.tsx
  context/
    AllergiesContext.tsx
    AttendanceContext.tsx
    AttendanceNutritionContext.tsx
    AttendanceSymptomContext.tsx
    AttendanceVitalContext.tsx
    DoctorContext.tsx
    MedicalRecordsContext.tsx
    MedicationsContext.tsx
    PatientContext.tsx
    VaccinationContext.tsx
  hooks/
    useAuth.ts
  medications/
    api/
      CalculadoraMedicamentos.ts
      LogicaMedicamentos.ts
      medicationsList.ts
      VerificacaoContraindicacoes.ts
    _layout.tsx
    index.tsx
    MedicationCalc.tsx
    MedicationResult.tsx
    PrescriptionScreen.tsx
    styles/
      Styles.ts
  terms/
    _layout.tsx
    index.tsx
  vaccines/
    layout.tsx
    CardVaccination.tsx
    index.tsx
    SplashScreen.tsx
assets/
  adaptive-icon.png
  Banner.png
  favicon.png
  icon.png
  splash.png
components/
  CEPInput.tsx
  CPFValidator.tsx
  LoadingOverlay.tsx
  ManualDataForm.tsx
  MedicationCalculator.tsx
  MedicationPicker.tsx
  MedicationResult.tsx
  PatientInputForm.tsx
  SwipeableRow.tsx
docs/
node_modules/
powersync/
  AppSchema.ts
  PowerSync.tsx
  PowerSyncProvider.tsx
  SupabaseConnector.ts
server/
  addDoctorIfNotExists.ts
utils/
  formatUtils.ts
  idadeCalculator.ts
  novaCalculadoraIdade.ts
  uuid.ts
.gitignore
app.config.ts
babel.config.js
eas.json
expo-env.d.ts
LICENSE
metro.config.js
package-lock.json
package.json
prettier.config.js
process-env.d.ts
tsconfig.json
typedoc.json
```

## Requisitos do Projeto

- **Node.js** v14+
- **Expo SDK50**
- **Supabase** para autenticação e banco de dados
- **React Native** para desenvolvimento mobile
- **TypeScript** para tipagem estática

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/usuario/neocare.git
   cd neocare
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Instale o Expo CLI globalmente (caso não esteja instalado):

   ```bash
   npm install -g expo-cli
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npx expo run:android
   ```

## Estrutura de Pastas

- **app/**: Contém as telas principais da aplicação, organizadas por módulos, como `allergies`, `attendances`, `auth` etc.
- **context/**: Arquivos de contexto do React, gerenciando estados globais como `AttendanceContext`, `DoctorContext` e outros.
- **hooks/**: Hooks personalizados, como `useAuth`.
- **medications/**: Implementação da lógica de medicamentos, incluindo cálculos de dosagem e verificação de contraindicações.
- **components/**: Componentes reutilizáveis, como `CEPInput`, `MedicationCalculator`, e `SwipeableRow`.
- **powersync/**: Implementações para sincronização de dados offline com o Supabase, incluindo `PowerSyncProvider`.
- **utils/**: Funções utilitárias, como `formatUtils`, `idadeCalculator`, e `uuid`.

## Funcionalidades

- **Cadastro e Gerenciamento de Pacientes**: Permite que profissionais de saúde cadastrem e acompanhem informações de pacientes neonatais.
- **Sincronização Offline**: Através do **PowerSync**, é possível operar sem conexão à internet, sincronizando os dados quando a conexão é restabelecida.
- **Calculadora de Medicamentos**: Cálculo de dosagens com base em dados dos pacientes e verificação de contraindicações.
- **Autenticação Segura**: Utiliza **Supabase** para gerenciamento de usuários.

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento mobile.
- **Expo**: Plataforma para facilitar o desenvolvimento e implantação de apps React Native.
- **TypeScript**: Adiciona tipagem estática ao JavaScript, tornando o código mais robusto.
- **Supabase**: Backend para autenticação, armazenamento e sincronização de dados.

## Como Contribuir

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção de bug (`git checkout -b minha-feature`).
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin minha-feature`).
5. Abra um Pull Request.

## Roadmap

- Melhorias na interface do usuário (UI/UX).
- Implementação de novos módulos de atendimento pediátrico.
- Expansão para outras plataformas (versão web).

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## Contato

Para qualquer dúvida ou sugestão, entre em contato:

- **Autor**: Leonardo da Silva Paiva
- **Email**: <paivaleonard@gmail.com>
