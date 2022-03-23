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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: `The users name`,
    example: ['Nick'],
  })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({
    description: `The users last name`,
    example: ['Doe'],
  })
  @Column({ nullable: true })
  last_name: string;

  @ApiProperty({
    description: `The users role`,
    example: ['author'],
  })
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
