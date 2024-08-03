import { Test, TestingModule } from '@nestjs/testing';
import { AdminStoreController } from './admin_store.controller';

describe('AdminStoreController', () => {
  let controller: AdminStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminStoreController],
    }).compile();

    controller = module.get<AdminStoreController>(AdminStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
