import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: null,
  database: 'f1-api',
  entities: ['src/**/entities/*.entity{.ts,.js}'],
  synchronize: false, // Avoid using synchronize in production
  migrations: ['database/migrations/*.ts'],
});
