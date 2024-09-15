import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Race } from './entities/race.entity';
import { Repository } from 'typeorm';
import { QueryRaceDto } from './dto/query-race.dto';

@Injectable()
export class RacesService {
  constructor(
    @InjectRepository(Race)
    private racesRepository: Repository<Race>,
  ) {}

  async create(createRaceDto: CreateRaceDto) {
    try {
      const race = this.racesRepository.create(createRaceDto);
      return race;
    } catch (error) {
      throw new Error(`Failed to create race: ${error.message}`);
    }
  }

  findAll(query: QueryRaceDto) {
    const { name, country, date } = query;
    const queryBuilder = this.racesRepository.createQueryBuilder('race');
    if (name) {
      queryBuilder.where('race.name LIKE :name', { name: `%${name}%` });
    }
    if (country) {
      queryBuilder.where('race.country LIKE :country', {
        country: `%${country}%`,
      });
    }
    if (date) {
      queryBuilder.where('race.date LIKE :date', { date: `%${date}%` });
    }
    return queryBuilder.getMany();
  }

  findOne(id: number) {
    return this.racesRepository.findOneBy({ id });
  }

  async update(id: number, updateRaceDto: UpdateRaceDto) {
    const race = this.racesRepository.findOneBy({ id });

    if (!race) {
      throw new NotFoundException(`Race with id ${id} not found`);
    }

    try {
      return await this.racesRepository.save({
        id,
        ...updateRaceDto,
      });
    } catch (error) {
      throw new Error(`Failed to update race: ${error.message}`);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} race`;
  }
}
