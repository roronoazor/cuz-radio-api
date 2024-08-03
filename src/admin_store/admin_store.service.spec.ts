import { Test, TestingModule } from '@nestjs/testing';
import { AdminStoreService } from './admin_store.service';

describe('AdminStoreService', () => {
  let service: AdminStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminStoreService],
    }).compile();

    service = module.get<AdminStoreService>(AdminStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
