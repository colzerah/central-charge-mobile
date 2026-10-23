# Central Charge API — Planejamento

> Documento de planejamento da API do Central Charge. **Status: ainda não implementada.**
> Próximo passo: instalar o Docker Desktop e montar a estrutura abaixo.

## 1. Arquitetura

| Item | Definição |
|---|---|
| Modelo | Monorepo simples: app e API no mesmo repositório |
| `src/` | Frontend (Expo), que só chama a API via axios |
| `api/` | Back-end completo e independente, com `package.json` e `node_modules` próprios |
| Ligação entre os dois | Só os scripts do `package.json` da raiz |
| Separar no futuro | É só mover a pasta `api/` para outro repositório |

## 2. Estrutura de pastas

| Caminho | Função |
|---|---|
| `api/package.json` | Dependências e scripts da API |
| `api/.env` | `PORT`, `DATABASE_URL`, `JWT_SECRET` |
| `api/docker-compose.yml` | Sobe o Postgres local |
| `api/prisma/schema.prisma` | Definição das tabelas |
| `api/prisma/migrations/` | Histórico de alterações do banco |
| `api/src/server.ts` | Sobe o servidor (`listen` em `0.0.0.0`) |
| `api/src/app.ts` | Middlewares globais (cors, json, erros) |
| `api/src/routes/` | Definição das rotas (`stations.routes.ts`...) |
| `api/src/controllers/` | Recebe `req`/`res` e chama o service |
| `api/src/services/` | Regra de negócio |
| `api/src/schemas/` | Validações com Zod |
| `api/src/middlewares/` | Auth, validação, tratamento de erro |
| `api/src/database/` | Cliente do Prisma |
| `src/service/api.ts` | Axios com `baseURL` apontando para a API |
| `src/service/requests/` | Funções que chamam as rotas da API |

Fluxo de uma requisição: `routes` → `controllers` → `services` → Prisma → Postgres.

## 3. Scripts

| Comando | Onde | O que faz |
|---|---|---|
| `npm start` | raiz | Sobe só o frontend (Expo) |
| `npm run api` | raiz | Sobe só a API |
| `npm run dev` | raiz | Sobe API + frontend juntos (`concurrently`) |
| `npm run dev` | `api/` | API com hot reload (`tsx watch`) |
| `npm run db:up` | `api/` | Sobe o Postgres no Docker |
| `npm run db:migrate` | `api/` | Cria/aplica migrations |
| `npm run db:studio` | `api/` | Abre o Prisma Studio para ver os dados |

Scripts previstos no `package.json` da raiz:

```json
"start": "expo start",
"api": "npm run dev --prefix api",
"dev": "concurrently -n api,app -c blue,green \"npm run api\" \"npm start\""
```

## 4. Stack

| Camada | Escolha | Por quê |
|---|---|---|
| Linguagem | TypeScript | Mesmo padrão do app, tipos compartilháveis |
| Runtime dev | tsx | Roda TS direto com hot reload |
| Framework | Express 5 | Simples, muito material, erros async nativos |
| Banco | PostgreSQL (Docker) | Padrão de mercado, mesmo banco em dev e prod |
| Geolocalização | Lat/lng + cálculo de distância (PostGIS depois) | "Estações perto de mim" |
| ORM | Prisma | Schema legível, migrations, autocomplete, Studio |
| Validação | Zod | Valida entrada e gera os tipos |
| Auth | JWT + bcrypt | Login stateless, token salvo no AsyncStorage |
| Config | dotenv + cors | Variáveis de ambiente e acesso do app |
| Orquestração | concurrently | Sobe os dois processos num terminal só |

## 5. Ajustes necessários no app

| Arquivo | Ajuste | Motivo |
|---|---|---|
| `metro.config.js` | `blockList` para `api/` | O Metro não pode tentar empacotar o back-end |
| `tsconfig.json` | `exclude: ["api"]` | Não misturar os tipos de Node com os do RN |
| `src/service/api.ts` | `baseURL` automático pelo `hostUri` do Expo | Funciona em qualquer dispositivo sem configurar nada |
| `package.json` (raiz) | Scripts `api` e `dev` + `concurrently` | Comandos de inicialização |
| Gerenciador | Usar só **npm** (`package-lock.json`, sem `yarn.lock`) | Evitar conflito de lockfiles |

## 6. Rede (app → API)

| Ambiente | Endereço da API |
|---|---|
| Simulador iOS | `localhost:3333` |
| Emulador Android | `10.0.2.2:3333` |
| Celular físico | `<IP da sua máquina>:3333` |
| Solução adotada | Pegar o IP do `hostUri` do Expo automaticamente |
| Produção | `EXPO_PUBLIC_API_URL` apontando para o servidor real |

## 7. Pré-requisitos

| Ferramenta | Status |
|---|---|
| Node.js (LTS) | Instalado |
| npm | Instalado (vem com o Node) |
| Docker Desktop | **Instalar**: https://www.docker.com/products/docker-desktop |

## 8. Produção (futuro)

| Item | Opção |
|---|---|
| Hospedar a API | Railway, Render ou VPS |
| Banco | Postgres gerenciado (Neon, Supabase, Railway) |
| App | Aponta para a URL da API via `EXPO_PUBLIC_API_URL` |

## Alternativa considerada (descartada)

**API Routes do Expo Router** (`+api.ts` dentro de `src/app/`): rodam no próprio `expo start`, mas misturam o back-end com o app, têm menos recursos e exigem `web.output: "server"`. Descartada em favor de uma API independente em `api/`.
