import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDriverAndTeamTable1726304978899 implements MigrationInterface {
    name = 'CreateDriverAndTeamTable1726304978899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`team\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`driver\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`teamId\` int NULL, UNIQUE INDEX \`REL_8c925de44f98a5e89c2f572794\` (\`teamId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`driver\` ADD CONSTRAINT \`FK_8c925de44f98a5e89c2f5727947\` FOREIGN KEY (\`teamId\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`driver\` DROP FOREIGN KEY \`FK_8c925de44f98a5e89c2f5727947\``);
        await queryRunner.query(`DROP INDEX \`REL_8c925de44f98a5e89c2f572794\` ON \`driver\``);
        await queryRunner.query(`DROP TABLE \`driver\``);
        await queryRunner.query(`DROP TABLE \`team\``);
    }

}
