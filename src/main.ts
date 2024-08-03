import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // use of helmet to prevent xss attacks
  app.use(helmet()); 

  // TODO: in production refine the cors access control
  app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    }),
  );

  app.useGlobalPipes(new ValidationPipe());


  const config = new DocumentBuilder()
    .setTitle('Cuz Radio API')
    .setDescription('Cuz Radio API Application')
    .setVersion('1.0')
    .addTag('cuzRadio')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000);
}
bootstrap();
