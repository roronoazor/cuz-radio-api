import { Test, TestingModule } from '@nestjs/testing';
import { SecondaryStoreService } from './secondary_store.service';

describe('SecondaryStoreService', () => {
  let service: SecondaryStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecondaryStoreService],
    }).compile();

    service = module.get<SecondaryStoreService>(SecondaryStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
