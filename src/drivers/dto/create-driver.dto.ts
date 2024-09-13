import { IsString } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  name: string;

  @IsString()
  team: string;

  // Add more validation as needed
}
