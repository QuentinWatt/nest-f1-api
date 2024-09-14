import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { Driver } from './entities/driver.entity';
import { Team } from 'src/teams/entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Team])],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}
