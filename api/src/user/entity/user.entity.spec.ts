import { User } from './user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './../service/user.service';
import { TypeOrmSQLITETestingModule } from './../../../test/test-utils/TypeOrmTestingModule';
import { testDatasetSeed } from '../../../test/test-utils/test.seed';

describe('SpaceshipsService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    await testDatasetSeed();
  });

  describe('UserEntity', () => {
    it('should be defined', () => {
      expect(new User()).toBeDefined();
    });

    it('listUsers', async () => {
      const users = await service.findAll();
      expect(users).toHaveLength(2);
    });
  });
});
