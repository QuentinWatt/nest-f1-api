import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  date: string;
}
