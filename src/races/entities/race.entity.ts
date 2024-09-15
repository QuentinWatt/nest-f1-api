import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Race {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column({ type: 'date' })
  date: string;
}
