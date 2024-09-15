import { Injectable } from '@nestjs/common';
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

  create(createRaceDto: CreateRaceDto) {
    return 'This action adds a new race';
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

  update(id: number, updateRaceDto: UpdateRaceDto) {
    return `This action updates a #${id} race`;
  }

  remove(id: number) {
    return `This action removes a #${id} race`;
  }
}
