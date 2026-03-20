# Portal de Produtos Digitais - AEGEA CoE Power Platform

Portal interno para vitrine, governanca e gestao das automacoes Power Platform da AEGEA. Permite visualizar apps em producao, acompanhar metricas, solicitar novas demandas e acessar trilhas de capacitacao para Citizen Developers.

## Tech Stack

| Camada    | Tecnologia                                               |
|-----------|----------------------------------------------------------|
| Frontend  | React 18, TypeScript, Vite 6, Tailwind CSS, React Query  |
| Backend   | Express.js 4, TypeScript, Prisma 6, Zod                  |
| Banco     | SQL Server 2022                                           |
| Auth      | Microsoft Entra ID (MSAL) / Mock local                    |
| Monorepo  | npm Workspaces + Turborepo                                |
| Infra     | Docker Compose, Kubernetes                                |

## Estrutura do Projeto

```
portal-produtos-digitais/
├── apps/
│   ├── frontend/           # SPA React (Vite)
│   │   ├── src/
│   │   │   ├── api/        # Clientes HTTP (axios) para cada recurso
│   │   │   ├── auth/       # mockAuth.ts + msalConfig.ts + AuthContext + AuthGuard
│   │   │   ├── components/ # Componentes React (admin, home, layout, ui...)
│   │   │   ├── data/       # mockData.ts (dados mock client-side)
│   │   │   ├── hooks/      # useApps, useCourses, useMetrics, useTestimonials
│   │   │   └── pages/      # HomePage, AppDetailPage, CitizenDevsPage, Admin
│   │   └── Dockerfile
│   │
│   └── backend/            # API REST (Express)
│       ├── src/
│       │   ├── config/     # env.ts, database.ts
│       │   ├── controllers/# Handlers para cada recurso + admin
│       │   ├── middleware/  # authMiddleware, adminGuard, errorHandler
│       │   ├── routes/     # Rotas Express
│       │   ├── services/   # Logica de negocio
│       │   └── prisma/     # schema.prisma + seed/
│       └── Dockerfile
│
├── packages/
│   └── shared/             # Tipos e constantes compartilhados (@portal/shared)
│
├── infra/
│   ├── docker-compose.yml  # Frontend + Backend + SQL Server
│   └── k8s/                # Manifests Kubernetes (deploy, ingress, HPA)
│
├── turbo.json
├── .env.example
└── package.json
```

## Pre-requisitos

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- **Docker** e **Docker Compose** (para SQL Server local)
- Ou uma instancia SQL Server acessivel

## Setup Rapido

### 1. Clonar e instalar dependencias

```bash
git clone <repo-url>
cd portal-produtos-digitais
npm install
```

### 2. Configurar variaveis de ambiente

```bash
cp .env.example .env
```

O `.env` padrao ja vem configurado para modo mock (desenvolvimento local). As variaveis principais:

| Variavel                  | Descricao                              | Default                              |
|---------------------------|----------------------------------------|--------------------------------------|
| `AUTH_MODE`               | Modo de autenticacao (`mock` / `entra`)| `mock`                               |
| `VITE_AUTH_MODE`          | Mesmo, para o frontend                 | `mock`                               |
| `PORT`                    | Porta do backend                       | `4000`                               |
| `DATABASE_URL`            | Connection string SQL Server           | `sqlserver://localhost:1433;...`      |
| `MOCK_JWT_SECRET`         | Secret para tokens dev                 | `dev-secret-key-change-in-production`|
| `VITE_API_URL`            | URL base da API para o frontend        | `http://localhost:4000/api/v1`       |
| `AZURE_TENANT_ID`        | Tenant ID do Entra ID (producao)       | -                                    |
| `AZURE_CLIENT_ID`        | Client ID do app registration          | -                                    |
| `AZURE_CLIENT_SECRET`    | Client secret (backend)                | -                                    |
| `VITE_AZURE_CLIENT_ID`   | Client ID para o frontend (MSAL)       | -                                    |
| `VITE_AZURE_TENANT_ID`   | Tenant ID para o frontend (MSAL)       | -                                    |
| `VITE_AZURE_REDIRECT_URI`| URI de redirect MSAL                   | `http://localhost:3000`              |

### 3. Subir o banco de dados

```bash
npm run docker:up
```

Isso sobe o SQL Server 2022 via Docker Compose na porta 1433. Aguarde o health check passar (~30s).

### 4. Executar migrations e seed

```bash
npm run db:migrate
npm run db:seed
```

O seed popula o banco com dados de exemplo: 8 apps, 6 cursos, 4 metricas globais, 6 depoimentos e 2 demandas.

### 5. Iniciar em desenvolvimento

```bash
# Frontend + Backend simultaneamente
npm run dev

# Ou individualmente
npm run dev:frontend   # http://localhost:3000
npm run dev:backend    # http://localhost:4000
```

### Alternativa: tudo via Docker

```bash
npm run docker:up
```

Sobe frontend (porta 3000), backend (porta 4000) e SQL Server (porta 1433) em containers com hot reload.

---

## Sistema de Mocks

O projeto possui duas camadas de mock que permitem desenvolvimento completo sem dependencias externas.

### Mock de Dados (Frontend)

**Arquivo:** `apps/frontend/src/data/mockData.ts`

Os hooks React (`useApps`, `useCourses`, `useMetrics`, `useTestimonials`) consomem dados diretamente desse arquivo em vez de chamar a API backend. Os dados sao filtrados em memoria no proprio hook.

**Exemplo — `useApps.ts`:**
```typescript
// Atualmente: importa dados mock e filtra client-side
import { MOCK_APPS } from '@/data/mockData';

export function useApps(filters?) {
  return useQuery({
    queryKey: ['apps', filters],
    queryFn: async () => {
      let filtered = [...MOCK_APPS];
      // ... filtragem em memoria
      return { data: filtered, total: filtered.length, page: 1, totalPages: 1 };
    },
  });
}
```

### Mock de Autenticacao

**Arquivo:** `apps/frontend/src/auth/mockAuth.ts`

Simula autenticacao com usuarios hardcoded, armazenando sessao no `localStorage` (chave `portal_mock_auth`). O token e um JSON em base64 (nao e JWT real).

**Usuarios mock disponiveis:**

| Usuario  | Senha    | Role     | Email               |
|----------|----------|----------|---------------------|
| `admin`  | `admin`  | ADMIN    | admin@aegea.mock    |
| `editor` | `editor` | EDITOR   | editor@aegea.mock   |
| `viewer` | `viewer` | VIEWER   | viewer@aegea.mock   |

**Backend mock auth:** Quando `AUTH_MODE=mock`, o middleware (`apps/backend/src/middleware/authMiddleware.ts`) decodifica o token base64 em vez de validar JWT. O endpoint de login (`POST /api/v1/auth/login`) aceita qualquer senha para usuarios existentes no banco.

---

## Como Desativar os Mocks

### Passo 1: Conectar hooks a API real

Altere cada hook para usar os clientes HTTP ja existentes em `apps/frontend/src/api/`:

```typescript
// apps/frontend/src/hooks/useApps.ts — ANTES (mock)
import { MOCK_APPS } from '@/data/mockData';

// apps/frontend/src/hooks/useApps.ts — DEPOIS (API real)
import { fetchApps } from '@/api/apps';

export function useApps(filters?) {
  return useQuery({
    queryKey: ['apps', filters],
    queryFn: () => fetchApps(filters),  // chama GET /api/v1/apps
  });
}
```

Repetir para os demais hooks:
- `useCourses.ts` → usar `fetchCourses()` de `@/api/courses`
- `useMetrics.ts` → usar `fetchMetrics()` de `@/api/metrics`
- `useTestimonials.ts` → usar `fetchTestimonials()` de `@/api/testimonials`

Os arquivos de servico em `apps/frontend/src/api/` ja estao prontos com as chamadas axios corretas.

### Passo 2: Ativar autenticacao real (Microsoft Entra ID)

1. Altere no `.env`:
   ```env
   AUTH_MODE=entra
   VITE_AUTH_MODE=entra
   ```

2. Preencha as variaveis do Entra ID:
   ```env
   AZURE_TENANT_ID=<seu-tenant-id>
   AZURE_CLIENT_ID=<seu-client-id>
   AZURE_CLIENT_SECRET=<seu-secret>
   VITE_AZURE_CLIENT_ID=<seu-client-id>
   VITE_AZURE_TENANT_ID=<seu-tenant-id>
   VITE_AZURE_REDIRECT_URI=http://localhost:3000
   ```

3. No frontend, o `AuthContext.tsx` ja possui logica condicional para inicializar MSAL quando `VITE_AUTH_MODE=entra`.

4. No backend, o `authMiddleware.ts` ja alterna entre decodificacao base64 (mock) e validacao JWT (entra). **Atencao:** o modo entra atualmente usa `jwt.verify()` com `MOCK_JWT_SECRET` como placeholder — para producao, substituir por validacao JWKS contra o endpoint do Microsoft Entra ID.

### Passo 3: Atualizar o cliente HTTP

Em `apps/frontend/src/api/client.ts`, substituir `getMockToken()` pela obtencao de token real via MSAL:

```typescript
// ANTES
import { getMockToken } from '@/auth/mockAuth';
const token = getMockToken();

// DEPOIS
import { msalInstance } from '@/auth/msalConfig';
const account = msalInstance.getActiveAccount();
const response = await msalInstance.acquireTokenSilent({ scopes: ['api://<client-id>/access'], account });
const token = response.accessToken;
```

---

## Integracoes e API

### Rotas da API (Backend)

**Rotas publicas:**

| Metodo | Rota                      | Descricao                                  |
|--------|---------------------------|--------------------------------------------|
| POST   | `/api/v1/auth/login`      | Login (mock ou Entra ID)                   |
| GET    | `/api/v1/auth/me`         | Retorna usuario autenticado                |
| GET    | `/api/v1/apps`            | Lista apps (com filtros: category, phase, search, paginacao) |
| GET    | `/api/v1/apps/:slug`      | Detalhe de um app por slug                 |
| GET    | `/api/v1/courses`         | Lista cursos (filtro por tier)             |
| GET    | `/api/v1/metrics`         | Metricas globais do CoE                    |
| GET    | `/api/v1/testimonials`    | Depoimentos (filtro por appId)             |
| POST   | `/api/v1/demands`         | Submeter nova demanda                      |

**Rotas administrativas** (requer `authMiddleware` + `adminGuard`):

| Metodo | Rota                           | Descricao                  |
|--------|--------------------------------|----------------------------|
| GET    | `/api/v1/admin/apps`           | CRUD de apps               |
| POST   | `/api/v1/admin/apps`           | Criar app                  |
| PUT    | `/api/v1/admin/apps/:id`       | Atualizar app              |
| DELETE | `/api/v1/admin/apps/:id`       | Remover app                |
| GET    | `/api/v1/admin/demands`        | Listar demandas            |
| PATCH  | `/api/v1/admin/demands/:id`    | Atualizar status/notas     |
| GET    | `/api/v1/admin/testimonials`   | CRUD de depoimentos        |
| GET    | `/api/v1/admin/metrics`        | CRUD de metricas           |
| GET    | `/api/v1/admin/courses`        | CRUD de cursos             |

### Fluxo de Autenticacao

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Frontend   │──────│  Entra ID /  │──────│   Backend   │
│   (MSAL)     │ token│   Mock Auth  │ JWT  │  Middleware  │
└─────────────┘      └──────────────┘      └─────────────┘
                                                  │
                           Decodifica token ──────┘
                           Seta req.user
                           Verifica role (adminGuard)
```

**Mock mode:** Token = base64(JSON do usuario). Middleware decodifica sem validacao criptografica.

**Entra mode:** Token = JWT assinado pelo Entra ID. Middleware valida assinatura (requer implementacao JWKS em producao).

### Banco de Dados

- **Provider:** SQL Server 2022
- **ORM:** Prisma 6
- **Schema:** `apps/backend/src/prisma/schema.prisma`

**Modelos principais:**

| Modelo         | Descricao                                      |
|----------------|-------------------------------------------------|
| `App`          | Aplicacao Power Platform (nome, categoria, fase, metricas) |
| `AppBenefit`   | Beneficios de um app                            |
| `AppDocument`  | Documentos vinculados (PDF, link, video)        |
| `AppMetric`    | Metricas especificas de um app                  |
| `RelatedFlow`  | Fluxos relacionados (Power Automate, Power BI)  |
| `Testimonial`  | Depoimentos de usuarios                         |
| `Demand`       | Solicitacoes de novas automacoes                |
| `GlobalMetric` | Metricas globais do CoE                         |
| `Course`       | Cursos de capacitacao (tiers T1-T4)             |
| `User`         | Usuarios do portal (vinculados ao Entra ID)     |

### Pacote Compartilhado (@portal/shared)

Tipos TypeScript e constantes usados por frontend e backend:

- `packages/shared/src/types/` — Interfaces: `IApp`, `IAppDetail`, `ICourse`, `IDemand`, `IMetric`, `ITestimonial`, `IUser`
- `packages/shared/src/constants/` — Enums: categorias de app, fases do ciclo de vida, tiers de capacitacao

---

## Rotas do Frontend

| Rota                  | Pagina               | Descricao                          |
|-----------------------|----------------------|------------------------------------|
| `/`                   | HomePage             | Vitrine de apps, metricas, depoimentos |
| `/app/:slug`          | AppDetailPage        | Detalhe do app com beneficios e docs   |
| `/citizen-developers` | CitizenDevsPage      | Trilhas de capacitacao (T1-T4)         |
| `/admin/login`        | AdminLoginPage       | Login administrativo                   |
| `/admin/*`            | AdminDashboardPage   | Painel admin (protegido, role ADMIN)   |

---

## Scripts Disponiveis

| Script              | Descricao                                          |
|---------------------|----------------------------------------------------|
| `npm run dev`       | Inicia frontend + backend (Turborepo)              |
| `npm run build`     | Build de producao de ambos                         |
| `npm run lint`      | Verificacao TypeScript                             |
| `npm run dev:frontend` | Apenas frontend (porta 3000)                    |
| `npm run dev:backend`  | Apenas backend (porta 4000)                     |
| `npm run db:migrate`   | Executa migrations Prisma                       |
| `npm run db:seed`      | Popula banco com dados de exemplo               |
| `npm run db:studio`    | Abre Prisma Studio (GUI do banco)               |
| `npm run docker:up`    | Sobe todos os servicos via Docker Compose       |
| `npm run docker:down`  | Para todos os containers                        |

---

## Deploy

### Docker Compose (Desenvolvimento/Staging)

```bash
npm run docker:up
```

### Kubernetes (Producao)

Manifests em `infra/k8s/`:

- `namespace.yml` — Namespace dedicado
- `configmap.yml` — Configuracoes nao-sensiveis
- `secrets.yml` — Credenciais (DATABASE_URL, AZURE_CLIENT_SECRET)
- `backend-deployment.yml` — Deploy + Service do backend
- `frontend-deployment.yml` — Deploy + Service do frontend (Nginx)
- `ingress.yml` — Ingress com roteamento
- `hpa.yml` — Horizontal Pod Autoscaler

---

## Checklist para Producao

- [ ] Alterar `AUTH_MODE` e `VITE_AUTH_MODE` para `entra`
- [ ] Configurar App Registration no Azure Entra ID
- [ ] Preencher todas as variaveis `AZURE_*` e `VITE_AZURE_*`
- [ ] Implementar validacao JWKS no `authMiddleware.ts` (substituir `jwt.verify` por validacao contra endpoint Microsoft)
- [ ] Conectar hooks do frontend a API real (remover imports de `mockData.ts`)
- [ ] Atualizar `client.ts` para obter token via MSAL
- [ ] Configurar `DATABASE_URL` apontando para SQL Server de producao
- [ ] Alterar `MOCK_JWT_SECRET` para um secret seguro
- [ ] Revisar CORS no backend para dominio de producao
- [ ] Configurar secrets no Kubernetes (`infra/k8s/secrets.yml`)
