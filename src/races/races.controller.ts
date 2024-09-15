import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { RacesService } from './races.service';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { QueryRaceDto } from './dto/query-race.dto';
import { Response } from 'express';

@Controller('races')
export class RacesController {
  constructor(private readonly racesService: RacesService) {}

  @Post()
  async create(@Body() createRaceDto: CreateRaceDto, @Res() res: Response) {
    const race = await this.racesService.create(createRaceDto);
    return res.status(HttpStatus.CREATED).json(race);
  }

  @Get()
  findAll(@Query() query: QueryRaceDto) {
    return this.racesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.racesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRaceDto: UpdateRaceDto) {
    return this.racesService.update(+id, updateRaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.racesService.remove(+id);
  }
}
