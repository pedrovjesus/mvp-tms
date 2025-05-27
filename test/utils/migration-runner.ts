// test/utils/migration-runner.ts
import { DataSource } from 'typeorm';

export async function runMigrations(dataSource: DataSource) {
  try {
    await dataSource.runMigrations();
    console.log('Migrations executadas com sucesso.');
  } catch (err) {
    console.error('Erro ao executar migrations:', err);
    throw err;
  }
}
