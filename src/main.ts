// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDataSource } from './typeorm.config';

async function bootstrap() {
  // inicializa a conexão antes de tudo
  const dataSource = createDataSource();
  await dataSource.initialize();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`Conectado ao banco: ${dataSource.options.database}`);
}
bootstrap();
