import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const APP_PORT = process.env.APP_PORT || 3071;

  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api');

  await app.listen(APP_PORT, () => {
    console.log(`🚀 Server started at http://localhost:${APP_PORT}`);
    console.log(`🚨️ Environment: ${process.env.NODE_ENV}`);
  });
}

bootstrap();
