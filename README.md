# Turborepo MFE

A intenção do projeto consistia em adaptar o projeto anterior para uma arquitetura micro-frontend.
Tendo uma aplicação next.js como host, uma remota em react e consumindo uma api express.js com banco em mongoDB.

## Inicialização do projeto em através de containers docker:

Execute o comando abaixo na pasta raíz do repositório.

```sh
docker-compose -f docker-compose.yml build
```

Em seguida execute:

```sh
docker-compose -f docker-compose.yml up -d
```

## Inicialização para ambiente de desenvolvimento:

Apenas execute os comandos abaixo para iniciar todos os projetos em modo de desenvolvimento.

```bash
yarn install
```

```bash
yarn run dev
```
