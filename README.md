# StoreHub

Um backend desenvolvido em BunJS para um sistema de gerenciamento de lojas, franquias, produtos, estoque, vendas e afins. Esse projeto tem como ideia manter o minimalismo e, portanto, não tem nenhuma dependência. Ainda assim, ele tem recursos e funcionalidades como cache, autenticação, autorização, validação, entre outros. As abstrações presentes no código são feitas a mão e em sua maioria estão presentes em `src/lib` ou `src/middlewares`. Dê uma olhada e sinta-se livre para contribuir ou abrir uma issue!
1. [Requisitos](#requisitos)
2. [Instalação](#instalação)
3. [Setup e execução](#setup-e-execução)
4. [Estrutura de pastas](#estrutura-de-pastas)
5. [Contribuição](#contribuição)
## Requisitos
A aplicação tem como requisito primordial o Bun. Cheque a [documentação oficial](https://bunjs.dev) para mais informações sobre como instalar e configurar o BunJS em seu OS. 
PS: Não é possível rodar essa aplicação sem o Bun, visto que é utilizado uma série de APIs dele.

## Setup e execução
Ainda que a aplicação de fato não utilize de nenhuma dependência, o `@faker.js` é utilizado para gerar dados fictícios para testes, além de duas dependências para a tipagem do Bun. Entretanto, são apenas dependências de desenvolvimento. Para instalar as dependências, execute o comando abaixo:
```bash
bun i
```
Para rodar a aplicação em modo de desenvolvimento, execute o comando abaixo:
```bash
bun src/index | bun dev
```
Para fazer o build da aplicação, execute o comando abaixo:
```bash
bun build
```
Para rodar a aplicação em modo de produção, execute o comando abaixo:
```bash
bun start
```
Para rodar os testes, execute o comando abaixo:
```bash
bun test
```

## Estrutura de pastas
A estrutura de pastas do projeto é a seguinte:
```
src/
  controllers/
  lib/
  middlewares/
  models/
  routes/
  services/
  utils/
```
####  1. `controllers/`
##### Contém os controladores da aplicação.
    Nos controllers, é feita a manipulação dos dados e a chamada dos serviços. Basicamente, é ele que faz a ponte entre as rotas e os serviços, lidando com as requisições e respostas.
####  2. `lib/`
##### Contém as abstrações da aplicação.
    As abstrações são feitas a mão e são utilizadas para facilitar a manutenção e a organização do código. A funcionalidade de roteamento, o esqueleto da aplicação, a validação, a autenticação, a autorização, o cache, entre outros, são abstrações presentes nessa pasta. Dê uma olhada!
####  3. `middlewares/`
##### Contém os middlewares da aplicação.
    Os middlewares basicamente são configurações do servidor. Eles são utilizados para interceptar as requisições e fazer alguma ação antes de passar para o controlador. Por exemplo, a autorização está presente nessa pasta.
####  4. `models/`
##### Contém os modelos da aplicação.
    Os models são as entidades da aplicação. Lá, localizam-se os types e algumas queries de criação de tabelas.
####  5. `routes/`
##### Contém as rotas da aplicação.
    As rotas são os endpoints da aplicação. Lá, é feita a chamada dos controladores.
####  6. `services/`
##### Contém os serviços da aplicação.
    Os services são responsáveis pela lógica de negócio da aplicação. Eles são chamados pelos controladores e fazem a manipulação de certos recursos que não são relacionados a banco de dados.
####  7. `utils/`
##### Contém as utilidades da aplicação.
    As utilidades são funções que são utilizadas em mais de um lugar da aplicação. Elas são funções que facilitam a manipulação de dados e a organização do código.


## Contribuição
Mais uma vez, Sinta-se livre para contribuir com o projeto. Abra uma issue ou faça um pull request. Toda contribuição é bem-vinda! 
``