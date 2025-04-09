import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomerΑndVehicleTable1744242646863
  implements MigrationInterface
{
  name = 'CreateCustomerΑndVehicleTable1744242646863';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicle" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "vehicle_plate" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "brand" varchar NOT NULL, "chassi_number" varchar NOT NULL, "renavam" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_592f7e83d2d07f8a83a33c0d9ac" UNIQUE ("vehicle_plate", "chassi_number", "renavam"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "vehicle"`);
    await queryRunner.query(`DROP TABLE "customer"`);
  }
}
