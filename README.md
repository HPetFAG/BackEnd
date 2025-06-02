<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest



## Descrição

HelpPet é um sistema de software voltado ao auxílio de adoções e resgates de animais, criado como parte de um projeto acadêmico. Seu principal objetivo é conectar pessoas que desejam adotar ou ajudar animais em situação de risco com ONGs, protetores independentes e outros usuários.

Este repositório corresponde à parte back-end da aplicação, desenvolvida com foco na segurança, escalabilidade e organização de dados, permitindo o gerenciamento completo das funcionalidades principais do sistema.

## Iniciando o projeto

```bash
$ pnpm install
```

## Rodando o projeto

```bash
# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Testes (Indisponivel)

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Acessando o swagger 
``` TS
http://localhost:3000/docs/
```


## Deixando uma rota privada  (Protegida por token)
``` TS
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
```

## Deixando uma rota publica
``` TS
  @Public()
  @Get('profile')
  getProfile(@Request() req) {
    return "Estou Publica";
  }
```


## License

[MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

###
© 2025 HelpPet. Todos os direitos reservados.

Este projeto foi desenvolvido com fins educacionais como parte de um trabalho acadêmico. A reprodução, distribuição ou uso do código-fonte é permitida somente para fins não comerciais e com os devidos créditos ao(s) autor(es).

Autor(es): Jean, Murillo
<br>
Instituição de Ensino: Fag (Fundacao Assis Gurgacz)

