import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { SuccessfulResponseInterceptor } from './common/api-handlers/response.interceptor';
import helmet from 'helmet';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: false, forbidUnknownValues: false }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessfulResponseInterceptor());
  app.use(helmet());
  app.set('trust proxy', 1);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const config = new DocumentBuilder()
    .setTitle('Permian Backend')
    .setDescription('Backend APIs for Permian')
    .setVersion('1.0')
    .addTag('docs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(process.env.PORT, async () => {
    console.log(
      `⚡️[server]: Server is running at on Port: ${process.env.PORT}`,
    );
  });
}
bootstrap();
