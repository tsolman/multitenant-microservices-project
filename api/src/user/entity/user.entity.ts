import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '../types';
import { Workspace } from '../../workspace/entity/workspace.entity';
import { Config } from './config.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.READER,
  })
  role: UserRole;

  @OneToMany(() => Config, (configs) => configs.user)
  @JoinColumn()
  configs: Config[];

  @ManyToOne(() => Workspace, (workspace) => workspace.users)
  @JoinColumn()
  workspace: Workspace;

  @Column({ nullable: true })
  workspaceId: number;
}
