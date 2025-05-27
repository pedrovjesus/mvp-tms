import { testDataSource } from './utils/database-test.providers';

async function clearDatabase() {
  const entities = testDataSource.entityMetadatas;
  for (const entity of entities) {
    const repository = testDataSource.getRepository(entity.name);
    await repository.clear();
  }
}

beforeAll(async () => {
  console.log('🏁 Iniciando testes E2E...');
  await testDataSource.initialize();
  await testDataSource.synchronize(true);
  await testDataSource.query('SET FOREIGN_KEY_CHECKS=0');

  const tables: { table_name: string }[] = await testDataSource.query(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = '${testDataSource.options.database}'`,
  );

  for (const { table_name } of tables) {
    await testDataSource.query(`DROP TABLE IF EXISTS \`${table_name}\``);
  }

  await testDataSource.query('SET FOREIGN_KEY_CHECKS=1');
  await testDataSource.runMigrations();
});

beforeEach(async () => {
  console.log('🧹 Limpando o banco de dados...');
  await testDataSource.query('SET FOREIGN_KEY_CHECKS=0');
  await clearDatabase();
  await testDataSource.query('SET FOREIGN_KEY_CHECKS=1');
});

afterAll(async () => {
  if (testDataSource.isInitialized) {
    await testDataSource.destroy();
    console.log('🔌 Conexão com banco encerrada');
  }
});
