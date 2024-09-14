import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { Repository } from 'typeorm';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Team } from 'src/teams/entities/team.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driversRepository: Repository<Driver>,
  ) {}

  findAll(): Promise<Driver[]> {
    return this.driversRepository.find();
  }

  async findOne(id: number): Promise<Driver> {
    const driver = await this.driversRepository.findOneBy({ id });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    return this.driversRepository.findOneBy({ id });
  }

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    try {
      const driver = this.driversRepository.create({
        name: createDriverDto.name,
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

    Object.assign(driver, updateDriverDto);

    return this.driversRepository.save(driver);
  }

  async remove(id: number): Promise<void> {
    await this.driversRepository.delete(id);
  }
}
