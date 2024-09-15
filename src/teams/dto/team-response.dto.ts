import { Expose } from 'class-transformer';

export class TeamResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
