# Orbits

• [Introdução](#introdução)  
• [Funcionalidades](#funcionalidades)  
• [Tecnologias](#tecnologias)  
• [Instalação](#instalação)  
• [Licença](#licença)  

## Introdução

***Screen Recorder*** é um aplicativo de gravação de tela desenvolvido com Electron, Vite e React, criado como meu primeiro contato com Electron. O foco principal foi o design da interface, um overlay simples e funcional inspirado no gravador de tela da Nvidia. O objetivo foi criar uma UI intuitiva e esteticamente agradável, explorando o desenvolvimento multiplataforma e a integração entre processos main e renderer no Electron.<br/><br/>
![gifDemonstração](resources/showGif.gif)

## Funcionalidades

**Overlay Personalizável** 🎨: Interface de usuário fluida com um design elegante e opções ajustáveis diretamente no overlay.

**Menu Intuitivo** 📋: Menu inicial com três opções principais: *Instant Replay (on/off)*, *Record (on/off)* e configurações gerais, projetado para fácil navegação.

**Personalização de Hotkeys** ⌨️: Suporte a atalhos globais customizáveis para ações rápidas, gerenciados pelo módulo globalShortcut do Electron.

**Personalização no Diretório** 📂: Opção de definir diretório de salvamento personalizado através de uma interface amigável, utilizando `fs` e `dialog`.


## Tecnologias

![Electron](https://img.shields.io/badge/-Electron-282C34?style=flat&logo=electron&logoColor=47848F) Usado como base para criar o aplicativo, gerenciando processos: main (backend) e renderer (frontend).

![Vite](https://img.shields.io/badge/-Vite-282C34?style=flat&logo=vite&logoColor=646CFF) Utilizado para um desenvolvimento rápido e build otimizado do frontend.

![React](https://img.shields.io/badge/-React-282C34?style=flat&logo=react&logoColor=61DAFB) Utilizado para construir a interface do aplicativo e gerenciar o estado da aplicação através de um contexto.

![TypeScript](https://img.shields.io/badge/-TypeScript-282C34?style=flat&logo=typescript&logoColor=3178C6) Aplicado pra estruturar o código e desenvolver funções como as hotkeys e o gerenciamento de diretórios, mantendo o projeto organizado.

![Styled Components](https://img.shields.io/badge/-Styled--Components-282C34?style=flat&logo=styled-components&logoColor=DB7093) Usado para estilização dinâmica e modular da interface, integrado ao React.


## Instalação

### • Pré-requisitos
Tenha o [Node.js](https://nodejs.org/en/download/package-manager)🛠️ instalado em sua máquina para poder executar o aplicativo.

### • Passos para instalação

• Clone o repositório:

```sh
git clone https://github.com/LucasMartins717/Screen-Recorder
```

• Acesse o diretório do projeto:

```sh
cd Screen-Recorder
```

• Instale as dependências:

```sh
npm install
```

• Inicie o aplicativo:

```sh
npm run dev
```

## Licença

• Este projeto utiliza a Licença MIT. Para mais informações, consulte o arquivo [LICENSE](./LICENSE).
