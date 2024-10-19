# NEOCARE - Aplicativo Mobile para Atendimento Neonatal

## Descrição

NEOCARE é uma aplicação mobile desenvolvida para facilitar o atendimento neonatal, especialmente em regiões remotas e carentes. Utilizando tecnologias como **React Native**, **Expo**, **TypeScript**, e **Supabase**, o projeto visa fornecer suporte para médicos e profissionais da saúde ao permitir acesso às informações de pacientes, mesmo em ambientes offline. A solução foi desenvolvida como parte de um projeto acadêmico com o objetivo de auxiliar no combate à mortalidade infantil.

## Estrutura do Projeto

## Imagens das Telas do Produto

### Cadastro de Alergias

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/alergias_cadastro.png" alt="Cadastro de Alergias" width="25%" />

### Detalhes de Alergias

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/alergias_detalhes.png" alt="Detalhes de Alergias" width="25%" />

### Cadastro de Prontuário - Tela 1

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/cadastro_prontuario_tela_1.png" alt="Cadastro de Prontuário - Tela 1" width="25%" />

### Cadastro de Prontuário - Tela 2

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/cadastro_prontuario_tela_2.png" alt="Cadastro de Prontuário - Tela 2" width="25%" />

### Cadastro de Prontuário - Tela 3

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/cadastro_prontuario_tela_3.png" alt="Cadastro de Prontuário - Tela 3" width="25%" />

### Cadastro de Prontuário - Tela 4

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/cadastro_prontuario_tela_4.png" alt="Cadastro de Prontuário - Tela 4" width="25%" />

### Criação de Conta

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/criacao_conta.png" alt="Criação de Conta" width="25%" />

### Criação de Perfil Médico

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/criacao_perfil_medico.png" alt="Criação de Perfil Médico" width="25%" />

### Detalhes do Paciente

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/detalhes_paciente.png" alt="Detalhes do Paciente" width="25%" />

### Funções do Paciente

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/funcoes_paciente.png" alt="Funções do Paciente" width="25%" />

### Gráficos Detalhados

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/graficos_detalhes.png" alt="Gráficos Detalhados" width="25%" />

### Gráficos

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/graficos.png" alt="Gráficos" width="25%" />

### Histórico de Prontuário

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/historico_prontuario.png" alt="Histórico de Prontuário" width="25%" />

### Home Drawer

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/home_drawer.png" alt="Home Drawer" width="25%" />

### Home

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/home.png" alt="Home" width="25%" />

### Instruções para Tratar Criança

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/instrucoes_tratar_crianca.png" alt="Instruções para Tratar Criança" width="25%" />

### Medicamentos - Cadastro do Paciente

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/medicamentos_cadastro_paciente.png" alt="Medicamentos - Cadastro do Paciente" width="25%" />

### Cadastro de Paciente

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/paciente_cadastro.png" alt="Cadastro de Paciente" width="25%" />

### Pesquisa de Paciente

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/pesquisa_paciente.png" alt="Pesquisa de Paciente" width="25%" />

### Redefinição de Senha

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/redefinicao_senha.png" alt="Redefinição de Senha" width="25%" />

### Splash Screen

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/splash_screen.png" alt="Splash Screen" width="25%" />

### Tela de Login

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/tela_login.png" alt="Tela de Login" width="25%" />

### Termos de Aceite

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/termos_aceite.png" alt="Termos de Aceite" width="25%" />

### Vacinas - Cadastro

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/vacinas_cadastro.png" alt="Vacinas - Cadastro" width="25%" />

### Vacinas - Cartão

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/vacinas_cartao.png" alt="Vacinas - Cartão" width="25%" />

### Visualização de Prontuário

<img src="https://github.com/leonardo201800478/Neocare/blob/main/assets/prints/visualizacao_prontuario.png" alt="Visualização de Prontuário" width="25%" />

## Requisitos do Projeto

- **Node.js** v14+
- **Expo CLI**
- **Supabase** para autenticação e banco de dados
- **React Native** para desenvolvimento mobile
- **TypeScript** para tipagem estática

## Instalação

1. Clone o repositório:

2. Instale as dependências:

3. Instale o Expo CLI globalmente (caso não esteja instalado):

4. Inicie o servidor de desenvolvimento:

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
- **Email**: [paivaleonard@gmail.com](mailto:paivaleonard@gmail.com)
