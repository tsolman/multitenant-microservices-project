import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../../src/user/entity/user.entity';
import { Workspace } from '../../src/workspace/entity/workspace.entity';

export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [User, Workspace],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([User, Workspace]),
];
