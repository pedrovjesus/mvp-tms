import { createDataSource } from '../src/typeorm.config';

const testDataSource = createDataSource('test');

async function clearDatabase() {
  const entities = testDataSource.entityMetadatas;
  for (const entity of entities) {
    await testDataSource.getRepository(entity.name).clear();
  }
}

beforeAll(async () => {
  await testDataSource.initialize();
  await testDataSource.dropDatabase();
  await testDataSource.synchronize();
  await testDataSource.runMigrations();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  if (testDataSource.isInitialized) {
    await testDataSource.destroy();
    console.log('🔌 Conexão com banco de testes encerrada');
  }
});
