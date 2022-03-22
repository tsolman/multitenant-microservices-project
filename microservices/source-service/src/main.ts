import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from 'src/app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');
async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 8081;
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.HOST,
      port,
    },
  });
  await app.listen();
  logger.log(`Source microservice running on port: ${port}`);
}
bootstrap();
