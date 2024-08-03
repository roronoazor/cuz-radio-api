import { Test, TestingModule } from '@nestjs/testing';
import { PrimaryStoreController } from './primary_store.controller';

describe('PrimaryStoreController', () => {
  let controller: PrimaryStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrimaryStoreController],
    }).compile();

    controller = module.get<PrimaryStoreController>(PrimaryStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
