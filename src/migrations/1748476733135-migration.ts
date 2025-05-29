import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1748476733135 implements MigrationInterface {
    name = 'Migration1748476733135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_status_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('PENDENTE', 'ABERTO', 'FINALIZADO', 'CANCELADO') NOT NULL, \`changedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`order_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`trip\` (\`id\` int NOT NULL AUTO_INCREMENT, \`plannedRoute\` text NULL, \`startDate\` timestamp NULL, \`endDate\` timestamp NULL, \`status\` enum ('PENDENTE', 'ABERTO', 'FINALIZADO', 'CANCELADO') NOT NULL DEFAULT 'PENDENTE', \`notes\` text NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`orderIdId\` int NULL, \`vehicleIdId\` int NULL, \`driverIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`cnh\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`cpf\` varchar(255) NOT NULL, \`birthday\` date NOT NULL, \`gender\` varchar(255) NOT NULL, \`position\` varchar(255) NOT NULL, \`departament\` varchar(255) NOT NULL, \`admissionDate\` date NOT NULL, \`workSchedule\` varchar(255) NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`destination\` varchar(255) NOT NULL, \`departureDate\` date NOT NULL, \`arrivalDate\` timestamp NOT NULL, \`status\` enum ('PENDENTE', 'ABERTO', 'FINALIZADO', 'CANCELADO') NOT NULL DEFAULT 'PENDENTE', \`origin\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`vehicleId\` int NULL, \`customerId\` int NULL, \`driverId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`vehicle_plate\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`year\` int NOT NULL, \`brand\` varchar(255) NOT NULL, \`chassi_number\` varchar(255) NOT NULL, \`renavam\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_592f7e83d2d07f8a83a33c0d9a\` (\`vehicle_plate\`, \`chassi_number\`, \`renavam\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cep\` varchar(255) NOT NULL, \`number\` int NOT NULL, \`complement\` varchar(255) NULL, \`street\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`uf\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order_status_history\` ADD CONSTRAINT \`FK_1ca7d5228cf9dc589b60243933c\` FOREIGN KEY (\`order_id\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trip\` ADD CONSTRAINT \`FK_985aec23bd881a4047c7c5838b8\` FOREIGN KEY (\`orderIdId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trip\` ADD CONSTRAINT \`FK_048d7c2a2c4dfcb3a5cd715d715\` FOREIGN KEY (\`vehicleIdId\`) REFERENCES \`vehicle\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trip\` ADD CONSTRAINT \`FK_33fc5b801cdd577966f8f200c0a\` FOREIGN KEY (\`driverIdId\`) REFERENCES \`employer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_2333a48aa47e80d36422c60d224\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicle\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_124456e637cca7a415897dce659\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_8cbf856839ddca842f21b804a91\` FOREIGN KEY (\`driverId\`) REFERENCES \`employer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_8cbf856839ddca842f21b804a91\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_124456e637cca7a415897dce659\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_2333a48aa47e80d36422c60d224\``);
        await queryRunner.query(`ALTER TABLE \`trip\` DROP FOREIGN KEY \`FK_33fc5b801cdd577966f8f200c0a\``);
        await queryRunner.query(`ALTER TABLE \`trip\` DROP FOREIGN KEY \`FK_048d7c2a2c4dfcb3a5cd715d715\``);
        await queryRunner.query(`ALTER TABLE \`trip\` DROP FOREIGN KEY \`FK_985aec23bd881a4047c7c5838b8\``);
        await queryRunner.query(`ALTER TABLE \`order_status_history\` DROP FOREIGN KEY \`FK_1ca7d5228cf9dc589b60243933c\``);
        await queryRunner.query(`DROP TABLE \`address\``);
        await queryRunner.query(`DROP INDEX \`IDX_592f7e83d2d07f8a83a33c0d9a\` ON \`vehicle\``);
        await queryRunner.query(`DROP TABLE \`vehicle\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`employer\``);
        await queryRunner.query(`DROP TABLE \`trip\``);
        await queryRunner.query(`DROP TABLE \`order_status_history\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
    }

}
