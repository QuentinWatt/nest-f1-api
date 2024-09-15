import { Team } from '../../teams/entities/team.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Team, (team) => team.drivers, { eager: true })
  team: Team;
}
