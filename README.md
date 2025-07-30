# Aplicação de Geração e Manipulação de Usuários Fictícios

Este projeto foi desenvolvido como parte da disciplina **Autoração Multimídia II** do curso de **Bacharelado em Sistemas e Mídias Digitais** da **Universidade Federal do Ceará (UFC)**.

## 👨‍🏫 Autor

**Prof. Wellington W. F. Sarmento**  
Instituto Universidade Virtual (UFC Virtual)
Universidade Federal do Ceará (UFC)

### Equipe

**Ingryd Cordeiro Duarte**
Universidade Federal do Ceará (UFC)

**Renan Araujo Polainas**
Universidade Federal do Ceará (UFC)

**Tiago Viana Monteiro**
Universidade Federal do Ceará (UFC)

**David Boanerges**
Universidade Federal do Ceará (UFC)

**Arthur Heráclio**
Universidade Federal do Ceará (UFC)

---

## ✅ Requisitos Funcionais

| ID     | Descrição                                                                |
| ------ | ------------------------------------------------------------------------ |
| RF0001 | Gerar usuários fictícios com nome, idade, endereço e e-mail              |
| RF0002 | Listar os usuários em uma interface web com paginação                    |
| RF0003 | Ordenar os usuários por nome ou idade, de forma crescente ou decrescente |
| RF0004 | Inserir um novo usuário na base de dados (arquivo JSON)                  |
| RF0005 | Atualizar os dados de um usuário pelo ID                                 |
| RF0006 | Remover um usuário pelo ID                                               |
| RF0007 | Salvar e manter persistência dos usuários em arquivo JSON                |

---

## 📘 Acesso ao Tutorial

Você pode acessar um tutorial completo sobre estra aplicação de exemplo através deste link:
👉 [`tutorial.md`](./public/tutorial.md)

---

## 📂 Estrutura dos Arquivos

- server.js: servidor Express com API RESTful
- index.html: interface de listagem
- script.js: funções de carregamento, ordenação e paginação
- style.css: estilo da interface
- usuarios.json: banco de dados local
- gerar_usuarios_fake.js: gera usuários fictícios

## 📘 Funcionalidades

| ID     | Descrição                                                                | Implementado |
| ------ | ------------------------------------------------------------------------ | ------------ |
| RF0001 | Gerar usuários fictícios com nome, idade, endereço e e-mail              | ☑️           |
| RF0002 | Listar os usuários em uma interface web com paginação                    | ☑️           |
| RF0003 | Ordenar os usuários por nome ou idade, de forma crescente ou decrescente | ☑️           |
| RF0004 | Inserir um novo usuário na base de dados (arquivo JSON)                  | ☑️           |
| RF0005 | Atualizar os dados de um usuário (pelo ID)                               | ☑️           |
| RF0006 | Remover um usuário do sistema (pelo ID\_                                 | ☑️           |
| RNF001 | Salvar e manter persistência dos usuários em arquivo JSON                | ☑️          |
| RNF002 | Paginar os usuários usando API (/list-users/:count?)                     | ☑️           |

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **@faker-js/faker**
- **UUID**
- **Body-Parser**
- **CORS**
- **HTML + JavaScript puro (sem frameworks)**

---

## Execução da aplicação


### 1. Clone o repositório

```bash
git clone https://github.com/seuusuario/usuarios-app.git
cd usuarios-app
```

### 2. Rode o comando para instalar as dependências e gerar o usuarios.json

```bash
npm build
```

### 3. Execute o projeto utilizando o modo de desenvolvimento (nodemon) ou produção

```bash
npm run dev 
# ou
npm start
```

A aplicação estará disponível em: `http://localhost:3000`

---

## 📝 Licença

Este projeto está licenciado sob a Licença MIT.