import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://memory-cards-seven-zeta.vercel.app',
    ],
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    allowedHeaders:
      'Content-Type, Authorization,  Access-Control-Allow-Origin, Access-Control-Allow-Credentials',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 4200);
}
bootstrap();
