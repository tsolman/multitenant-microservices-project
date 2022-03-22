import { Test, TestingModule } from '@nestjs/testing';
import { SourceService } from './source.service';
const input = { field1: '' };
const result = { field1: '', addedField: 'This is a new value' };

describe('SourceService', () => {
  let service: SourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SourceService],
    }).compile();

    service = module.get<SourceService>(SourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a new object field', () => {
    expect(service.formatInput(input)).toEqual(result);
  });
});
