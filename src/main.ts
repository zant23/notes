import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
      }),
  );

  useSwagger(app);

  const configService = app.get(ConfigService);
  const port = configService.get('port');

  await app.listen(port);

  console.log(`App started on port ${port}`);
}

bootstrap();

function useSwagger(app:INestApplication){
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Notes')
        .setDescription('The Notes API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
}