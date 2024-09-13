import { IsNumber, IsString } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  name: string;

  @IsNumber()
  teamId: number;

  // Add more validation as needed
}
