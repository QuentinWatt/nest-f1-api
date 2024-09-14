import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriversModule } from './drivers/drivers.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: null,
      database: 'f1-api',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: false, // Automatically synchronize schema; turn off in production
    }),
    DriversModule,
    TeamsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
