import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { Repository } from 'typeorm';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Team } from './../teams/entities/team.entity';
import { QueryDriverDto } from './dto/query-driver.dto';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driversRepository: Repository<Driver>,
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}

  findAll(query: QueryDriverDto): Promise<Driver[]> {
    const { name, teamName } = query;

    const queryBuilder = this.driversRepository.createQueryBuilder('driver');
    queryBuilder.leftJoinAndSelect('driver.team', 'team');

    if (name) {
      queryBuilder.andWhere('driver.name LIKE :name', {
        name: `%${name}%`,
      });
    }

    if (teamName) {
      queryBuilder.andWhere('driver.team.name LIKE :name', {
        name: `%${teamName}%`,
      });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Driver> {
    const driver = await this.driversRepository.findOne({
      where: { id },
      relations: ['team'],
    });

    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    return driver;
  }

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    try {
      const team = await this.teamsRepository.findOne({
        where: { name: createDriverDto.teamName },
      });

      if (!team) {
        throw new Error(
          `Team with name "${createDriverDto.teamName}" not found`,
        );
      }

      const driver = this.driversRepository.create({
        name: createDriverDto.name,
        team: team,
      });

      return await this.driversRepository.save(driver);
    } catch (error) {
      // Handle errors (e.g., logging or rethrowing as a custom exception)
      throw new Error(`Failed to create driver: ${error.message}`);
    }
  }

  async update(id: number, updateDriverDto: UpdateDriverDto): Promise<Driver> {
    const driver = await this.driversRepository.findOneBy({ id });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    const team = await this.teamsRepository.findOne({
      where: { name: updateDriverDto.teamName },
    });

    if (!team) {
      throw new Error(`Team with name "${updateDriverDto.teamName}" not found`);
    }

    Object.assign(driver, updateDriverDto);

    return this.driversRepository.save({
      team,
      ...driver,
    });
  }

  async remove(id: number): Promise<void> {
    await this.driversRepository.delete(id);
  }
}
