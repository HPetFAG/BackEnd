import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('HelpPet API')
    .setDescription('Documentação da API')
    .setVersion('1.0')
    .addBearerAuth() // habilita o botão "Authorize" com JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({})
  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();
