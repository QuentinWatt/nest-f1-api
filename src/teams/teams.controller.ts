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
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Response } from 'express';
import { TeamResponseDto } from './dto/team-response.dto';
import { plainToInstance } from 'class-transformer';
import { QueryDriverDto } from 'src/drivers/dto/query-driver.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  private transformToTeamDto(team: any): TeamResponseDto {
    return plainToInstance(TeamResponseDto, team);
  }

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto, @Res() res: Response) {
    const team = await this.teamsService.create(createTeamDto);
    const transformedTeam = this.transformToTeamDto(team);
    return res.status(HttpStatus.OK).json(transformedTeam);
  }

  @Get()
  async findAll(@Query() query: QueryDriverDto, @Res() res: Response) {
    const teams = await this.teamsService.findAll(query);
    const transformedTeams = this.transformToTeamDto(teams);

    return res.status(HttpStatus.OK).json(transformedTeams);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const team = await this.teamsService.findOne(+id);
    const transformedTeam = this.transformToTeamDto(team);

    return res.status(HttpStatus.OK).json(transformedTeam);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
    @Res() res: Response,
  ) {
    const team = await this.teamsService.update(+id, updateTeamDto);
    const transformedTeam = this.transformToTeamDto(team);

    return res.status(HttpStatus.CREATED).json(transformedTeam);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.teamsService.remove(+id);
    return res.status(HttpStatus.NO_CONTENT).json();
  }
}
