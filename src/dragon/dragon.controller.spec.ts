import { Test, TestingModule } from '@nestjs/testing';
import { DragonController } from './dragon.controller';

describe('DragonController', () => {
  let controller: DragonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DragonController],
    }).compile();

    controller = module.get<DragonController>(DragonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
