**MVP TMS - Transportation Management System**

Este projeto é um **MVP** (Minimum Viable Product) de um TMS desenvolvido em **NestJS** e **TypeORM**, com foco em funcionalidades essenciais para gerenciamento de transporte: pedidos, roteirização, veículos, motoristas, acompanhamento em tempo real e controle de custos.
Um projeto pessoal que nasceu com a ideia de solucionar problemas que vejo no dia a dia em muitas transportadoras.

---

## 🛠️ Tecnologias e Ferramentas

- **Framework**: NestJS
- **ORM**: TypeORM
- **Banco de Dados**: PostgreSQL (ou MySQL)
- **Linguagem**: TypeScript
- **Gerenciamento de Dependências**: npm / yarn
- **Controle de Versão**: Git

---

## 🚀 Funcionalidades Principais

1. **Clientes & Pedidos**

   - Cadastro de clientes (pessoa física ou jurídica)

2. **Rotas**

   - Definição de rotas

3. **Veículos & Motoristas**

   - Cadastro de veículos e tipos de veículos
   - Cadastro de motoristas

4. **Controle de pedidos**

   - Registro de ordens de transporte

---

## ⚙️ Instalação e Configuração

1. **Clone o repositório**

   ```bash
   git clone https://github.com/pedrovjesus/mvp-tms.git
   cd mvp-tms
   ```

2. **Instale dependências**

   ```bash
   npm install
   # ou yarn install
   ```

3. **Banco de Dados**

   - Crie o database `base` no PostgreSQL ou MySql
   - Execute as migrations:
     ```bash
     npm run typeorm migration:run
     ```

4. **Inicie a aplicação**

   ```bash
   npm run start:dev
   ```

A API estará disponível em `http://localhost:3000`.

---

## 📦 Scripts Disponíveis

- `npm run start` - Inicia em modo de produção
- `npm run start:dev` - Inicia em modo de desenvolvimento (Watch)
- `npm run lint` - Executa linting
- `npm run typeorm` - Helper para comandos TypeORM

---

## 🛣️ Próximos Passos / Roadmap
- Envio de dados de ordem via pdf ✅

---
