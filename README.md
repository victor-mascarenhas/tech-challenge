# Turborepo MFE

Link do video demo - https://drive.google.com/file/d/1Bupvveq691jSoolk0WhpXXk5tkaxiiqY/view?usp=sharing

O projeto consistiu em adaptar a aplicação anterior para uma arquitetura micro-frontend com a implementação de novas features, como por exemplo a paginação das transações, estado global regido pelo redux e o gráfico de investimentos.
Ao todo são 4 containers em uma rede compartilhada orquestrados através do docker-compose, tendo a aplicação principal next.js como host, uma remota em react para os gráficos da página de investimentos, consumindo e autenticando com o auxílio de uma api express.js conectada ao banco de dados mongo.
Todas as aplicações fazem parte deste monorepo e compartilham algumas dependências.
Para o deploy e hospedagem foi utilizada a infraestrutura da AWS, soluções como o EC2 e EIP, onde o docker funciona em conjunto com NGINX para disponibilizar os containers para a internet. 

## Inicialização do projeto através de containers docker:

Execute o comando abaixo na pasta raíz do repositório.

```sh
docker-compose -f docker-compose.yml build
```

Em seguida execute:

```sh
docker-compose -f docker-compose.yml up -d
```

## Inicialização para ambiente de desenvolvimento:

Apenas execute os comandos abaixo utilizando o yarn na raíz do projeto para iniciar todos os projetos em modo de desenvolvimento simultaneamente.

```bash
yarn install
```

```bash
yarn run dev
```
