**MVP TMS - Transportation Management System**

Este projeto é um **MVP** (Minimum Viable Product) de um TMS desenvolvido em **NestJS** e **TypeORM**, com foco em funcionalidades essenciais para gerenciamento de transporte: pedidos, roteirização, veículos, motoristas, acompanhamento em tempo real e controle de custos.
Um projeto pessoal que nasceu com a ideia de solucionar problemas que vejo no dia a dia em muitas transportadoras.

---

## 🛠️ Tecnologias e Ferramentas

- **Framework**: NestJS (vX.X.X)
- **ORM**: TypeORM (vX.X.X)
- **Banco de Dados**: PostgreSQL (ou MySQL)
- **Linguagem**: TypeScript
- **Gerenciamento de Dependências**: npm / yarn
- **Controle de Versão**: Git

---

## 🚀 Funcionalidades Principais

1. **Clientes & Pedidos**

   - Cadastro de clientes (pessoa física ou jurídica)
   - Registro de pedidos e itens de pedido

2. **Rotas & Paradas**

   - Definição de rotas reutilizáveis com paradas sequenciais (latitude/longitude)
   - Planejamento de janelas de chegada
   - Em desenvolvimento*

3. **Veículos & Motoristas**

   - Cadastro de veículos e tipos de veículos
   - Histórico de IPVA, revisões e consumo (km/L)
   - Cadastro de motoristas, disponibilidade e vínculo com contas de usuário
   - Em desenvolvimento*

4. **Controle de Custos**

   - Registro de custos de viagem (pedágio, alimentação, combustível)
   - Cálculo automático de IPVA anual e média de consumo
   - Custos de manutenção e revisões de veículos
   - Em desenvolvimento*

5. **Segurança & Permissões**

   - Autenticação de usuários
   - Perfis e permissões granular para acesso a recursos
   - Em desenvolvimento*

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
- `npm run test` - Executa testes unitários
- `npm run lint` - Executa linting
- `npm run typeorm` - Helper para comandos TypeORM

---

## 🛣️ Próximos Passos / Roadmap

- Implementar Dashboard com KPIs (tempo médio de entrega, consumo médio)
- Otimização de rotas via integração com API de mapas (Google/Mapbox)
- Implementar versionamento de API (v1, v2)
- Implementar logica de controle de gastos
- Envio de dados excel de frota, funcionarios e despesas
- Testes end-to-end (e2e)

---
