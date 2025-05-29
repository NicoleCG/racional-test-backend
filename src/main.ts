import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { configSwagger } from './config/swagger.config';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configSwagger(app); // Build Swagger documentation

  await app.listen(process.env.NEST_PORT ?? 3000);
}
bootstrap();
