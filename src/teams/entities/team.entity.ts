import { Driver } from 'src/drivers/entities/driver.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Driver, (driver) => driver.team)
  drivers: Driver[];
}
