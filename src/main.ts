import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'node:path';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(join(process.cwd(), 'public'));

  const port = Number(process.env.PORT ?? 3010);
  const publicBaseUrl =
    process.env.PUBLIC_BASE_URL ?? `http://localhost:${port}`;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nike Shop API')
    .setDescription(
      'In-memory Nike ecommerce API: products, cart, shipping, and mock checkout.',
    )
    .setVersion('1.0.0')
    .addServer(publicBaseUrl)
    .addTag('products')
    .addTag('cart')
    .addTag('shipping')
    .addTag('checkout')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  // Explicitly no auth — Agent Designer defaults to Bearer if this is omitted
  document.security = [];
  if (document.components) {
    delete document.components.securitySchemes;
  }
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'api-json',
    yamlDocumentUrl: 'api-yaml',
  });

  await app.listen(port);
  console.log(`Nike Shop API running at http://localhost:${port}`);
  console.log(`Storefront: http://localhost:${port}/`);
  console.log(`OpenAPI JSON: http://localhost:${port}/api-json`);
  console.log(`Swagger UI: http://localhost:${port}/api`);
}
await bootstrap();
