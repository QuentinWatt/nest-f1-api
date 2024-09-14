import { IsOptional, IsString } from 'class-validator';

export class QueryDriverDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  teamName?: string;
}
