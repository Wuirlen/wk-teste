# Todo App - Aplicação de Gerenciamento de Tarefas

Uma aplicação completa de gerenciamento de tarefas com autenticação, desenvolvida com Node.js, React e PostgreSQL.

## 🚀 Funcionalidades

### Backend
- ✅ API RESTful com Node.js e Express
- ✅ Autenticação JWT
- ✅ CRUD completo de tarefas
- ✅ Paginação
- ✅ Filtros por status
- ✅ Validação com Joi
- ✅ Documentação Swagger
- ✅ Testes unitários
- ✅ PostgreSQL com Sequelize ORM

### Frontend
- ✅ Interface responsiva com Material-UI
- ✅ Autenticação e proteção de rotas
- ✅ Gerenciamento de estado com React Query
- ✅ Filtros (todas/pendentes/concluídas)
- ✅ Feedbacks visuais (loading, erro, sucesso)
- ✅ Componentização estruturada

## 🛠️ Tecnologias

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT
- Joi (validação)
- Swagger (documentação)
- Jest (testes)

### Frontend
- React 18
- Material-UI
- React Query
- React Router
- Axios

### DevOps
- Docker
- Docker Compose

## 🚀 Como Executar

### Pré-requisitos
- Docker
- Docker Compose

### Execução com Docker (Recomendado)

1. Clone o repositório
2. Execute o comando único:

```bash
docker-compose up --build
```

Este comando irá:
- Subir o banco PostgreSQL
- Construir e executar o backend
- Construir e executar o frontend

### Acessos

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Documentação API**: http://localhost:3001/api-docs
- **PostgreSQL**: localhost:5432

### Credenciais do Banco
- Database: `todoapp`
- User: `admin`
- Password: `password`

## 📚 API Endpoints

### Autenticação
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Login

### Tarefas (Requer autenticação)
- `GET /tasks` - Listar tarefas (com paginação e filtros)
- `POST /tasks` - Criar tarefa
- `PUT /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Excluir tarefa

### Parâmetros de Query para /tasks
- `page` - Página (padrão: 1)
- `limit` - Itens por página (padrão: 10)
- `status` - Filtro: 'completed', 'pending' ou omitir para todas

## 🧪 Testes

Para executar os testes do backend:

```bash
cd backend
npm test
```

## 📖 Documentação da API

Acesse http://localhost:3001/api-docs para ver a documentação completa da API com Swagger.

## 🏗️ Estrutura do Projeto

```
├── backend/
│   ├── src/
│   │   ├── config/          # Configurações
│   │   ├── controllers/     # Controladores
│   │   ├── middleware/      # Middlewares
│   │   ├── models/          # Modelos do banco
│   │   ├── routes/          # Rotas
│   │   ├── services/        # Lógica de negócio
│   │   └── server.js        # Servidor principal
│   ├── tests/               # Testes unitários
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── context/         # Context API
│   │   ├── hooks/           # Hooks customizados
│   │   ├── pages/           # Páginas
│   │   ├── services/        # Serviços API
│   │   └── App.js
│   └── Dockerfile
└── docker-compose.yml       # Orquestração dos serviços
```

## 🔒 Segurança

- Senhas criptografadas com bcrypt
- Autenticação JWT
- Validação de entrada com Joi
- Proteção de rotas no frontend
- CORS configurado

## 📱 Interface

A aplicação possui uma interface moderna e responsiva com:
- Tela de login/cadastro
- Dashboard principal com lista de tarefas
- Formulário modal para criar/editar tarefas
- Filtros por status
- Indicadores visuais de loading e erro
- Design Material Design