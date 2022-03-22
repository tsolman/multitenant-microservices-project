import { Test, TestingModule } from '@nestjs/testing';
import { SourceController } from './source.controller';

describe('UsersController', () => {
  let controller: SourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SourceController],
    }).compile();

    controller = module.get<SourceController>(SourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
