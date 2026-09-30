import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';

async function bootstrap() {
  console.log("NestJS Server is starting.....")
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  console.log(`Server Started At:- http://localhost:${process.env.PORT}`);
  
}
await bootstrap();
