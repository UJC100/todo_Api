import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))
  app.setGlobalPrefix('api/v1', { exclude: ['google/login', 'google'] });

  const Port = process.env.PORT
  await app.listen(Port);
}
bootstrap();
