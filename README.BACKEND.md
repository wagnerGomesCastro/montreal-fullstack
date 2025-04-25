
### Dependências utilizadas

- Node.js v22.15.0
- Nest.js v9.18.0
- TypeScript
- TypeOrm
- PostgreSQL
- Docker

### Baixe e execute o projeto localmente

**1 -** Atenção!! Para iniciar este projeto sem erro precisa primeiro iniciar a API do Backend

**2 -** Clone o projeto e instale as dependências:

```
$ git clone https://github.com/wagnerGomesCastro/montreal-fullstack/
$ cd montreal-fullstack
```

**2 -** Executar os camandos docker para subir banco de bados no backend localmente,

```
1- $ docker compose -f docker-compose.dev.yml --env-file .env.docker.dev build --no-cache backend postgres pgadmin
2- $ docker compose -f docker-compose.dev.yml --env-file .env.docker.dev --compatibility up -d  --remove-orphans postgres pgadmin
2- $ docker compose -f docker-compose.dev.yml --env-file .env.docker.dev --compatibility up  --remove-orphans backend 

```

**3 -** Aguardar alguns segundos para o container subir, agora pode acessar o banco de dados:

```
- Usuário Admin
  user: admin
  password: postgres
  database: postgres
```

**4 -** Depois instalar as dependências e o projeto estiver rodando sem erro, agora pode acessar o backend usando docker:

```
1- $ docker compose -f docker-compose.dev.yml --env-file .env.docker.dev exec backend bash

```

Abra o navegador e acesse [http://localhost:3071](http://localhost:3071) para visualizar o projeto.

**5 -** O arquivo api.example.http dentro da pasta backend contém os endpoints da API de exemplo,
para executar o aquivo precisar instalar o plugin REST Client do Vscode

```
$ ./packages/backend/api.example.http
```
