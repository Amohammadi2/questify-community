import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const dotenv = require('dotenv');

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8000, '127.0.0.1');
}
bootstrap();
