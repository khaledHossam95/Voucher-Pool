import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transforms plain objects to class instances
      whitelist: true, // Strips out any properties that are not in the DTO
      forbidNonWhitelisted: true, // Throws an error if unknown properties are present
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

