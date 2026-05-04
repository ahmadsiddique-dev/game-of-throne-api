import { Test, TestingModule } from '@nestjs/testing';
import { DragonController } from './dragon.controller';
import { DragonService } from './dragon.service';

const mockDragon = {
  name: 'Drogon',
  age: 5,
  color: 'black',
  isFireBreathing: true,
  rider: ['Daenerys'],
  type: 'FIRE',
  description: 'The largest and most aggressive of the three dragons',
};

const mockDragonService = {
  getAllDragons: jest.fn(),
  getDragon: jest.fn(),
  createDragon: jest.fn(),
};

describe('DragonController', () => {
  let controller: DragonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DragonController],
      providers: [
        {
          provide: DragonService,
          useValue: mockDragonService,
        },
      ],
    }).compile();

    controller = module.get<DragonController>(DragonController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllDragons', () => {
    it('should return all dragons', async () => {
      mockDragonService.getAllDragons.mockResolvedValue([mockDragon]);
      const result = await controller.getAllDragons();
      expect(result).toEqual([mockDragon]);
      expect(mockDragonService.getAllDragons).toHaveBeenCalled();
    });
  });

  describe('getDragon', () => {
    it('should return a dragon by name', async () => {
      mockDragonService.getDragon.mockResolvedValue(mockDragon);
      const result = await controller.getDragon('Drogon');
      expect(result).toEqual(mockDragon);
      expect(mockDragonService.getDragon).toHaveBeenCalledWith('Drogon');
    });
  });

  describe('createDragon', () => {
    it('should create a dragon', async () => {
      mockDragonService.createDragon.mockResolvedValue(mockDragon);
      const result = await controller.createDragon(mockDragon as any);
      expect(result).toEqual(mockDragon);
      expect(mockDragonService.createDragon).toHaveBeenCalledWith(mockDragon);
    });
  });
});
