import { Test, TestingModule } from '@nestjs/testing';
import { DragonService } from './dragon.service';

describe('DragonService', () => {
  let service: DragonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DragonService],
    }).compile();

    service = module.get<DragonService>(DragonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
