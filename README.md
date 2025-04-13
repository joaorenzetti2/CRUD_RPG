# RPG Character Management API

Uma API para gerenciamento de personagens e itens mágicos de RPG construída com NestJS.

## 🚀 Funcionalidades

- CRUD completo de personagens
- Gerenciamento de itens mágicos
- Atribuição de itens a personagens
- Validações de regras de negócio
- Documentação Swagger

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- npm (v6 ou superior)

## 🔧 Instalação

1. Clone o repositório
```bash
git clone <https://github.com/joaorenzetti2/CRUD_RPG.git>
```

2. Instale as dependências
```bash
npm install
```

3. Inicie a aplicação
```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3000`
A documentação Swagger estará disponível em `http://localhost:3000/api`

## 📌 Endpoints

### Personagens
- `POST /personagens` - Criar personagem
- `GET /personagens` - Listar personagens
- `GET /personagens/:id` - Buscar personagem por ID
- `PATCH /personagens/:id/nome-aventureiro` - Atualizar nome de aventureiro
- `DELETE /personagens/:id` - Remover personagem
- `POST /personagens/:id/itens/:itemId` - Adicionar item ao personagem
- `DELETE /personagens/:id/itens/:itemId` - Remover item do personagem
- `GET /personagens/:id/itens` - Listar itens do personagem
- `GET /personagens/:id/amuleto` - Buscar amuleto do personagem

### Itens Mágicos
- `POST /itens-magicos` - Criar item mágico
- `GET /itens-magicos` - Listar itens mágicos
- `GET /itens-magicos/:id` - Buscar item mágico por ID
- `DELETE /itens-magicos/:id` - Remover item mágico

### Personagem
- A soma de força base e defesa base não pode ultrapassar 10 pontos
- Pode ter vários itens mágicos
- Só pode ter 1 amuleto

### Item Mágico
- Armas não podem ter bônus de defesa
- Armaduras não podem ter bônus de força
- Amuletos podem ter ambos os bônus
- Valores de força e defesa devem ser no máximo 10
- Não pode ter força e defesa igual a 0 simultaneamente
- Só pode estar vinculado a um personagem por vez
