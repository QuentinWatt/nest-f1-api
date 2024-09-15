import { IsOptional, IsString } from 'class-validator';

export class QueryRaceDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  date: string;
}
