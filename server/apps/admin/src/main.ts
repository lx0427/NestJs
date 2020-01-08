import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // 指定是基于express的泛型
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  // 静态文件托管
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  });

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.ADMIN_PORT || 3009;
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}`);
}
bootstrap();
