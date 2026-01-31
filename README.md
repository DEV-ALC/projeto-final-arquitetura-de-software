# projeto-final-arquitetura-de-software

Projeto final de Arquitetura de software

### Configuração

- Monte o .env com as avariaveis de ambiente

```bash
DATABASE_URL="file:./dev.db"
```

### Rodar o projeto

```bash
npm i
npm run prisma:generate
npm run prisma:migrate
npx tsx src/adapters/cli/main.ts
```
