import { IsString } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  name: string;

  @IsString()
  teamName: string;

  // Add more validation as needed
}
