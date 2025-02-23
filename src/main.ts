import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:3001",  // Next.js Frontend-URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Falls Cookies oder Authentifizierung verwendet wird
  });

  await app.listen(3000);
}
bootstrap();
