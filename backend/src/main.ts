import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
  });

  /* app.enableCors({
    origin: 'http://localhost:5173', // Recomendado: restringir só ao frontend
    credentials: true, // Se for usar cookies ou autenticação
  }); */
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
