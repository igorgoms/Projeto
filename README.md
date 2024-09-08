# Projeto IRC Chat

Este projeto é uma implementação simples de um sistema de chat online em estilo IRC (Internet Relay Chat), utilizando Flask, Socket.IO e Vercel para o deployment. O objetivo é permitir a criação e conexão a servidores de chat onde os usuários podem enviar e receber mensagens em tempo real.

## Estrutura do Projeto

```
Projeto/
  ├── static/
  │   ├── css/
  │   │   └── style.css
  │   └── js/
  │       └── script.js
  ├── templates/
  │   ├── chat.html
  │   ├── configure.html
  │   ├── create_server.html
  │   ├── index.html
  │   └── login.html
  ├── .gitignore
  ├── Procfile
  ├── app.py
  ├── requeriments.txt
  ├── runtime.txt
  └── vercel.json
```

### **Arquivos principais:**
- **app.py**: Arquivo principal que contém a lógica do servidor Flask e Socket.IO para lidar com as conexões WebSocket e as rotas HTTP.
- **static/**: Contém arquivos estáticos como CSS e JavaScript.
  - **css/style.css**: Define o estilo da interface do chat e páginas de configuração.
  - **js/script.js**: Script responsável por gerenciar a comunicação com o servidor WebSocket e adicionar mensagens ao chat.
- **templates/**: Contém os arquivos HTML para as várias páginas do projeto (index, chat, login, configuração de servidor).
- **vercel.json**: Configuração necessária para o deployment no Vercel.
- **Procfile**: Define o comando necessário para iniciar o aplicativo no servidor (no caso de uso do Gunicorn).
- **requirements.txt**: Lista de dependências Python necessárias para o funcionamento do projeto.

## Dependências

O projeto utiliza as seguintes bibliotecas Python, conforme definido no arquivo `requirements.txt`:

```
Flask==2.3.3
Flask-SocketIO==5.3.0
python-socketio==5.7.0
gunicorn==20.1.0
flask-cors==4.0.1
gevent==22.10.2
```

### **Instalação de dependências:**
Para instalar todas as dependências, execute o comando:

```bash
pip install -r requirements.txt
```

## Funcionalidades

### **1. Criação de servidor**
Os usuários podem criar um servidor de chat fornecendo um nome e uma senha. Esses dados são armazenados temporariamente no servidor durante a sessão.

- Rota: `/create_server`
- HTML: `create_server.html`

### **2. Conexão a um servidor**
Usuários podem se conectar a um servidor existente fornecendo o nome do servidor, a senha, seu nome de usuário e uma cor personalizada para suas mensagens.

- Rota: `/configure`
- HTML: `configure.html`

### **3. Envio e recebimento de mensagens**
Depois de conectados a um servidor, os usuários podem enviar e receber mensagens em tempo real. Cada mensagem enviada aparece no chat com o nome de usuário e a cor escolhida.

- Rota: `/chat`
- HTML: `chat.html`

### **4. Autenticação de administrador**
O sistema também permite que administradores façam login, embora a lógica de autenticação ainda precise ser implementada.

- Rota: `/login`
- HTML: `login.html`

### **5. Página inicial**
A página inicial oferece opções para criar ou conectar-se a um servidor, além de acessar o login de administrador.

- Rota: `/`
- HTML: `index.html`

## Como Executar o Projeto Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Crie um ambiente virtual e ative-o:
   ```bash
   python -m venv venv
   source venv/bin/activate  # No Windows, use `venv\Scripts\activate`
   ```

3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

4. Execute o aplicativo:
   ```bash
   flask run
   ```

5. Acesse o aplicativo em `http://localhost:5000`.

## Deployment no Vercel

O projeto está configurado para deployment na plataforma Vercel. A configuração está no arquivo `vercel.json`, que define o comportamento de build e as rotas do aplicativo.

### Passos para o deployment:

1. Instale a CLI do Vercel:
   ```bash
   npm install -g vercel
   ```

2. Conecte-se à sua conta Vercel e implante o projeto:
   ```bash
   vercel
   ```

3. O Vercel cuidará do restante, incluindo a configuração de URLs e do ambiente de execução.

## Considerações Finais

Este é um projeto simples e pode ser expandido com várias funcionalidades adicionais, como autenticação de usuários, gerenciamento de sessões de chat, persistência de dados com banco de dados, e muito mais. A arquitetura básica permite fácil extensão e personalização.

**Desenvolvedor:** *[Igor Gomes]*  
**Licença:** MIT
