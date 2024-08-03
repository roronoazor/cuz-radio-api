import { Test, TestingModule } from '@nestjs/testing';
import { PrimaryStoreService } from './primary_store.service';

describe('PrimaryStoreService', () => {
  let service: PrimaryStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrimaryStoreService],
    }).compile();

    service = module.get<PrimaryStoreService>(PrimaryStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
