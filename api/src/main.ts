import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger('Main');

async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Multitenant API')
    .setDescription('This project demonstates an HTTP api that communicates to 2 microservices.')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  logger.log(`Multitenant API running on port: ${port}`);
}
bootstrap();
