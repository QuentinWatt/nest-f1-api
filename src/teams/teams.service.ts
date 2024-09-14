import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}

  findAll() {
    return this.teamsRepository.find();
  }

  findOne(id: number) {
    return this.teamsRepository.findOneBy({ id });
  }

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    try {
      const team = this.teamsRepository.create(createTeamDto);
      return await this.teamsRepository.save(team);
    } catch (error) {
      // Handle errors (e.g., logging or rethrowing as a custom exception)
      throw new Error(`Failed to create driver: ${error.message}`);
    }
  }

  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const driver = await this.teamsRepository.findOneBy({ id });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    Object.assign(driver, updateTeamDto);

    return this.teamsRepository.save(driver);
  }

  async remove(id: number): Promise<void> {
    await this.teamsRepository.delete(id);
  }
}
