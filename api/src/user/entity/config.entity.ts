import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb', { nullable: false })
  input: object;

  @ManyToOne(() => User, (user) => user.configs)
  @JoinColumn()
  user: User;
}
