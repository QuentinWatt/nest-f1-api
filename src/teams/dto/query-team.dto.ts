import { IsOptional, IsString } from 'class-validator';

export class QueryTeam {
  @IsOptional()
  @IsString()
  name?: string;
}
