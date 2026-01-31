# Projeto Final Arquitetura De Software

### Configuração

- Monte o .env com as avariaveis de ambiente

```bash
DATABASE_URL="file:./dev.db"
```

### Inicializar o projeto

```bash
npm i
npm run prisma:generate
npm run prisma:migrate
```

### Para Rodar os Testes

```bash
npm run test
```

### Para Testar a interface CLI

```bash
npx tsx src/adapters/cli/main.ts
```
