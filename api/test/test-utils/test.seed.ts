import { UserRole } from './../../src/user/types';
import { getConnection } from 'typeorm';
import { User } from './../../src/user/entity/user.entity';

export const testDatasetSeed = async () => {
  const connection = await getConnection();
  const entityManager = connection.createEntityManager();

  entityManager.insert<User>(User, {
    name: 'Nick',
    last_name: 'The Greek',
    role: UserRole.READER,
    workspace: { name: 'work' },
  });
  entityManager.insert<User>(User, {
    name: 'Joe',
    last_name: 'Rogan',
    role: UserRole.AUTHOR,
    workspace: { name: 'work' },
  });
};
