import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'node:path';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(join(process.cwd(), 'public'));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nike Shop API')
    .setDescription(
      'In-memory Nike ecommerce API: products, cart, shipping, and mock checkout.',
    )
    .setVersion('1.0.0')
    .addTag('products')
    .addTag('cart')
    .addTag('shipping')
    .addTag('checkout')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'api-json',
    yamlDocumentUrl: 'api-yaml',
  });

  const port = process.env.PORT ?? 3010;
  await app.listen(port);
  console.log(`Nike Shop API running at http://localhost:${port}`);
  console.log(`Storefront: http://localhost:${port}/`);
  console.log(`OpenAPI JSON: http://localhost:${port}/api-json`);
  console.log(`Swagger UI: http://localhost:${port}/api`);
}
await bootstrap();
