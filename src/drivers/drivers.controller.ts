import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { QueryDriverDto } from './dto/query-driver.dto';
import { Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { DriverResponseDto } from './dto/driver-response';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  private transformToDriverDto(driver: any): DriverResponseDto {
    return plainToInstance(DriverResponseDto, driver, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  async create(@Body() createDriverDto: CreateDriverDto, @Res() res: Response) {
    const driver = await this.driversService.create(createDriverDto);
    const transformedDriver = this.transformToDriverDto(driver);

    return res.status(HttpStatus.CREATED).json(transformedDriver);
  }

  @Get()
  async findAll(@Query() query: QueryDriverDto, @Res() res: Response) {
    const drivers = await this.driversService.findAll(query);
    const transformedDrivers = this.transformToDriverDto(drivers);

    return res.status(HttpStatus.OK).json(transformedDrivers);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const driver = await this.driversService.findOne(+id);
    const transformedDriver = this.transformToDriverDto(driver);
    return res.status(HttpStatus.OK).json(transformedDriver);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
    @Res() res: Response,
  ) {
    const driver = await this.driversService.update(+id, updateDriverDto);
    const driverTransform = this.transformToDriverDto(driver);
    return res.status(HttpStatus.OK).json(driverTransform);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    this.driversService.remove(+id);

    return res.status(HttpStatus.NO_CONTENT).json();
  }
}
