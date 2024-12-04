import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule); // default 
  const appExpress = await NestFactory.create<NestExpressApplication>(AppModule); // with express
  await appExpress.listen(process.env.PORT ?? 3000);
}
bootstrap();
