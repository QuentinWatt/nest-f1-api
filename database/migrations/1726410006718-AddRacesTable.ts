import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRacesTable1726410006718 implements MigrationInterface {
    name = 'AddRacesTable1726410006718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`race\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`date\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`race\``);
    }

}
