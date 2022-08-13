# Blogs Api

## Contexto:

Este é um projeto que fiz na <a href="https://www.betrybe.com/">```Trybe```</a> onde o  objetivo era criar uma API para um blog, onde nela seria possível registrar e buscar usuários, criar e buscar posts com base no id do usuário dono do post e ainda um sistema de login que verifica se o usuário existe ou não no banco de dados.


## O que a Trybe preparou:

Como em todos os projetos, a ```Trybe``` já deixa preparado uma base pronta no projeto apenas para desenvolvermos o necessário. Dentro da pasta ```./src```
já existia a pasta ```/database``` com as pastas filhas ```/config```, ```/migrations```, ```/seeders``` e ```Models```. Na pasta ```/config``` já havia uma configuração pré existente onde eu não precisei fazer alteraçoes, assim como na pasta ```/seeders``` e nos arquivos dentro dela.

Os arquivos ```api.js``` e ```server.js```, onde em ```server.js``` não precisei fazer alterações mas em ```api.js``` havia apenas um código simples apenas com a criação do ```app``` usando o ```express```.

## O que eu fiz:

Tirando os aquivos que foram citados a cima, todos os outros que estão dentro da pasta ```./src``` foram criados ou alterados por mim.

### Tecnologias que utilizei durante o projeto:
- JavaScript
- Express, Express-Rescue
- Sequelize, Sequelize-Cli
- Joi Validation
- MySQL2
- Docker
- Json Web Token (JWT)
- Git
- DotEnv
- VsCode

### Minhas contribuições:

- ### Banco de dados: <br>
Eu desenvolvi utiliazndo ```JavaScript```,  ```Sequelize``` e ```Sequelize-Cli``` os models e as migrations da api, fazendo a comunicação entre o banco de dados, criando as tabelas e colunas de ```User```, ```Category```, ```PostCategory``` e ```BlogPost```.

- ### Rotas:<br>
Desenvolvi as rotas de ```/login```, ```/users```, ```/categories``` e ```/post```. <br><br>
Na rota```/login``` o usuário apenas pode logar se tiver um email redistrado no banco de dados, se sim ele recebe um ```token``` de acesso gerado pelo ```JWT``` que contem a assinatura do email do usuário.<br>

A rota ```/users``` através de uma requisição do tipo ```GET``` pode-se listar todos os usuários registrados contendo as informações do usuário que são ```id```, ```displayName``` (nome de usuário), ```email``` e ```image``` (foto de perfil). Na mesma rota também é possível buscar por um usuário em específico apenas passando o seu ```id``` na url da requisição. Agora com uma requisição do tipo ```POST``` é possível criar um novo usuário passando as informações ```displayName```, ```email```, ```password``` e ```image``` no corpo da requisição, assim criando um novo usuário.<br>

A rota ```/cataegories``` através de uma requisição do tipo ```GET``` pode-se listar todos tipos de categorias ragistradas e com uma requisição do tipo  ```POST``` é possível criar um novo tipo de caegoria passando o nome dela no corpo da requisição. <br>

A rota ```/post``` <s>a rota mais trabalhosa delas</s> através de uma requisição do tipo ```GET``` é retornado uma lista contendo todas as publicações com seus respectivos usuários donos e uma outra lista ligada a publicação de categorias que a publicação tem. Também é possível buscar por uma publicação em específica passando o ```id``` da publicação na url da requisição. Com uma requisição do tipo ```POST``` é possível fazer uma nova publicação com o ```tittle```, ```content```, ```userId```, ```published``` e ```updated``` no corpo da requisição. Agora com uma requisição do tipo ```PUT``` é possível alterar o ```tittle``` e o ```content``` da publicação.<br>

## Como usar a aplicação:<br>
- Clone o repositório.
- Faça as instalações das dependências com o ```npm install```.
- Crie um arquivo ```.env``` e faça os ajustes das variáveis de ambiente nele ou entre na pasta ```./src/datavase/config``` e altere o arquivo ```config.ts``` para utilizar as suas variáveis locais de ambiente.
- Utilize o ```npm start``` para iniciar a aplicação.
- Recomendo usar algum software de consumo de API's como o Postman ou extenção do ```VsCode``` como o ```Thunder Client``` para consumir a API.
