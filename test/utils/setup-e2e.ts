// test/setup-e2e.ts
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { createDataSource } from '../../src/typeorm.config';

export const setupE2ETestApp = async (): Promise<INestApplication> => {
  // garante que a variável de ambiente já indique teste
  process.env.NODE_ENV = 'test';

  // inicializa o DataSource de teste
  const dataSource = createDataSource('test');
  await dataSource.initialize();
  await dataSource.dropDatabase();
  await dataSource.synchronize();

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();
  return app;
};
