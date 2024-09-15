import { Injectable } from '@nestjs/common';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Race } from './entities/race.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RacesService {
  constructor(
    @InjectRepository(Race)
    private racesRepository: Repository<Race>,
  ) {}

  create(createRaceDto: CreateRaceDto) {
    return 'This action adds a new race';
  }

  findAll() {
    return this.racesRepository.find();
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
