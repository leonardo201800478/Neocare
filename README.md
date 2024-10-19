# NEOCARE - Aplicativo Mobile para Atendimento Neonatal

## Descrição

NEOCARE é uma aplicação mobile desenvolvida para facilitar o atendimento neonatal, especialmente em regiões remotas e carentes. Utilizando tecnologias como **React Native**, **Expo**, **TypeScript**, e **Supabase**, o projeto visa fornecer suporte para médicos e profissionais da saúde ao permitir acesso às informações de pacientes, mesmo em ambientes offline. A solução foi desenvolvida como parte de um projeto acadêmico com o objetivo de auxiliar no combate à mortalidade infantil.

## Estrutura do Projeto

## Imagens das Telas do Produto

### Cadastro de Alergias
![Cadastro de Alergias](https://github.com/usuario/Neocare/blob/main/assets/prints/alergias_cadastro.png)

### Detalhes de Alergias
![Detalhes de Alergias](https://github.com/usuario/Neocare/blob/main/assets/prints/alergias_detalhes.png)

### Cadastro de Prontuário - Tela 1
![Cadastro de Prontuário - Tela 1](https://github.com/usuario/Neocare/blob/main/assets/prints/cadastro_prontuario_tela_1.png)

### Cadastro de Prontuário - Tela 2
![Cadastro de Prontuário - Tela 2](https://github.com/usuario/Neocare/blob/main/assets/prints/cadastro_prontuario_tela_2.png)

### Cadastro de Prontuário - Tela 3
![Cadastro de Prontuário - Tela 3](https://github.com/usuario/Neocare/blob/main/assets/prints/cadastro_prontuario_tela_3.png)

### Cadastro de Prontuário - Tela 4
![Cadastro de Prontuário - Tela 4](https://github.com/usuario/Neocare/blob/main/assets/prints/cadastro_prontuario_tela_4.png)

### Criação de Conta
![Criação de Conta](https://github.com/usuario/Neocare/blob/main/assets/prints/criacao_conta.png)

### Criação de Perfil Médico
![Criação de Perfil Médico](https://github.com/usuario/Neocare/blob/main/assets/prints/criacao_perfil_medico.png)

### Detalhes do Paciente
![Detalhes do Paciente](https://github.com/usuario/Neocare/blob/main/assets/prints/detalhes_paciente.png)

### Funções do Paciente
![Funções do Paciente](https://github.com/usuario/Neocare/blob/main/assets/prints/funcoes_paciente.png)

### Gráficos Detalhados
![Gráficos Detalhados](https://github.com/usuario/Neocare/blob/main/assets/prints/graficos_detalhes.png)

### Gráficos
![Gráficos](https://github.com/usuario/Neocare/blob/main/assets/prints/graficos.png)

### Histórico de Prontuário
![Histórico de Prontuário](https://github.com/usuario/Neocare/blob/main/assets/prints/historico_prontuario.png)

### Home Drawer
![Home Drawer](https://github.com/usuario/Neocare/blob/main/assets/prints/home_drawer.png)

### Home
![Home](https://github.com/usuario/Neocare/blob/main/assets/prints/home.png)

### Instruções para Tratar Criança
![Instruções para Tratar Criança](https://github.com/usuario/Neocare/blob/main/assets/prints/instrucoes_tratar_crianca.png)

### Medicamentos - Cadastro do Paciente
![Medicamentos - Cadastro do Paciente](https://github.com/usuario/Neocare/blob/main/assets/prints/medicamentos_cadastro_paciente.png)

### Cadastro de Paciente
![Cadastro de Paciente](https://github.com/usuario/Neocare/blob/main/assets/prints/paciente_cadastro.png)

### Pesquisa de Paciente
![Pesquisa de Paciente](https://github.com/usuario/Neocare/blob/main/assets/prints/pesquisa_paciente.png)

### Redefinição de Senha
![Redefinição de Senha](https://github.com/usuario/Neocare/blob/main/assets/prints/redefinicao_senha.png)

### Splash Screen
![Splash Screen](https://github.com/usuario/Neocare/blob/main/assets/prints/splash_screen.png)

### Tela de Login
![Tela de Login](https://github.com/usuario/Neocare/blob/main/assets/prints/tela_login.png)

### Termos de Aceite
![Termos de Aceite](https://github.com/usuario/Neocare/blob/main/assets/prints/termos_aceite.png)

### Vacinas - Cadastro
![Vacinas - Cadastro](https://github.com/usuario/Neocare/blob/main/assets/prints/vacinas_cadastro.png)

### Vacinas - Cartão
![Vacinas - Cartão](https://github.com/usuario/Neocare/blob/main/assets/prints/vacinas_cartao.png)

### Visualização de Prontuário
![Visualização de Prontuário](https://github.com/usuario/Neocare/blob/main/assets/prints/visualizacao_prontuario.png)

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