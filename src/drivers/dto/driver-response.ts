import { Expose, Type } from 'class-transformer';
import { TeamResponseDto } from 'src/teams/dto/team-response.dto';

export class DriverResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Type(() => TeamResponseDto)
  team: TeamResponseDto;
}
