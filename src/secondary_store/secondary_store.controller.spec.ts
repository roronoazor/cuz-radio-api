import { Test, TestingModule } from '@nestjs/testing';
import { SecondaryStoreController } from './secondary_store.controller';

describe('SecondaryStoreController', () => {
  let controller: SecondaryStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecondaryStoreController],
    }).compile();

    controller = module.get<SecondaryStoreController>(SecondaryStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
