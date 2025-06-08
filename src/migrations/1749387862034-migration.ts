import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1749387862034 implements MigrationInterface {
  name = 'Migration1749387862034';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cep\` varchar(255) NOT NULL, \`number\` int NOT NULL, \`complement\` varchar(255) NULL, \`street\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`uf\` varchar(255) NOT NULL, \`neighborhood\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`cpfCnpj\` varchar(255) NOT NULL, \`personType\` varchar(255) NOT NULL, \`stateRegistration\` varchar(255) NOT NULL, \`contributionType\` varchar(255) NOT NULL, \`taxRegime\` varchar(255) NOT NULL, \`fantasyName\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`addressId\` int NULL, UNIQUE INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` (\`email\`), UNIQUE INDEX \`REL_7697a356e1f4b79ab3819839e9\` (\`addressId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`vehicle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`vehicle_plate\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`year\` int NOT NULL, \`brand\` varchar(255) NOT NULL, \`chassi_number\` varchar(255) NOT NULL, \`renavam\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_592f7e83d2d07f8a83a33c0d9a\` (\`vehicle_plate\`, \`chassi_number\`, \`renavam\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`employer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`cnh\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`cpf\` varchar(255) NOT NULL, \`birthday\` date NOT NULL, \`gender\` varchar(255) NOT NULL, \`position\` varchar(255) NOT NULL, \`departament\` varchar(255) NOT NULL, \`admissionDate\` date NOT NULL, \`workSchedule\` varchar(255) NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`addressId\` int NULL, UNIQUE INDEX \`REL_ae971df4a078e19efb56524089\` (\`addressId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`destination\` varchar(255) NOT NULL, \`departureDate\` date NOT NULL, \`arrivalDate\` timestamp NOT NULL, \`status\` enum ('PENDENTE', 'ABERTO', 'FINALIZADO', 'CANCELADO') NOT NULL DEFAULT 'PENDENTE', \`origin\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`vehicleId\` int NULL, \`customerId\` int NULL, \`driverId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order_status_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('PENDENTE', 'ABERTO', 'FINALIZADO', 'CANCELADO') NOT NULL, \`changedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`order_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_7697a356e1f4b79ab3819839e95\` FOREIGN KEY (\`addressId\`) REFERENCES \`address\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employer\` ADD CONSTRAINT \`FK_ae971df4a078e19efb565240895\` FOREIGN KEY (\`addressId\`) REFERENCES \`address\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_2333a48aa47e80d36422c60d224\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicle\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_124456e637cca7a415897dce659\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_8cbf856839ddca842f21b804a91\` FOREIGN KEY (\`driverId\`) REFERENCES \`employer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_status_history\` ADD CONSTRAINT \`FK_1ca7d5228cf9dc589b60243933c\` FOREIGN KEY (\`order_id\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_status_history\` DROP FOREIGN KEY \`FK_1ca7d5228cf9dc589b60243933c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_8cbf856839ddca842f21b804a91\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_124456e637cca7a415897dce659\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_2333a48aa47e80d36422c60d224\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employer\` DROP FOREIGN KEY \`FK_ae971df4a078e19efb565240895\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_7697a356e1f4b79ab3819839e95\``,
    );
    await queryRunner.query(`DROP TABLE \`order_status_history\``);
    await queryRunner.query(`DROP TABLE \`order\``);
    await queryRunner.query(
      `DROP INDEX \`REL_ae971df4a078e19efb56524089\` ON \`employer\``,
    );
    await queryRunner.query(`DROP TABLE \`employer\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_592f7e83d2d07f8a83a33c0d9a\` ON \`vehicle\``,
    );
    await queryRunner.query(`DROP TABLE \`vehicle\``);
    await queryRunner.query(
      `DROP INDEX \`REL_7697a356e1f4b79ab3819839e9\` ON \`customer\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` ON \`customer\``,
    );
    await queryRunner.query(`DROP TABLE \`customer\``);
    await queryRunner.query(`DROP TABLE \`address\``);
  }
}
