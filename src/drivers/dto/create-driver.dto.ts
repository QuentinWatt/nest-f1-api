import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 120)
  name: string;

  @IsString()
  teamName: string;

  // Add more validation as needed
}
