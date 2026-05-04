import { Test, TestingModule } from '@nestjs/testing';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';

const mockHouse = {
  name: 'Stark',
  region: 'The North',
  founer: 'Bran the Builder',
  description: 'Winter is Coming',
  words: 'Winter is Coming',
  exist: true,
  lords: ['Eddard Stark'],
  ladies: ['Catelyn Tully'],
};

const mockHouseService = {
  getAllHouses: jest.fn(),
  getHouse: jest.fn(),
  createHouse: jest.fn(),
};

describe('HouseController', () => {
  let controller: HouseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HouseController],
      providers: [
        {
          provide: HouseService,
          useValue: mockHouseService,
        },
      ],
    }).compile();

    controller = module.get<HouseController>(HouseController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllHouses', () => {
    it('should return all houses', async () => {
      mockHouseService.getAllHouses.mockResolvedValue([mockHouse]);
      const result = await controller.getAllHouses();
      expect(result).toEqual([mockHouse]);
      expect(mockHouseService.getAllHouses).toHaveBeenCalled();
    });
  });

  describe('getHouse', () => {
    it('should return a house by name', async () => {
      mockHouseService.getHouse.mockResolvedValue(mockHouse);
      const result = await controller.getHouse('Stark');
      expect(result).toEqual(mockHouse);
      expect(mockHouseService.getHouse).toHaveBeenCalledWith('Stark');
    });
  });

  describe('createHouse', () => {
    it('should create a house', async () => {
      mockHouseService.createHouse.mockResolvedValue(mockHouse);
      const result = await controller.createHouse(mockHouse as any);
      expect(result).toEqual(mockHouse);
      expect(mockHouseService.createHouse).toHaveBeenCalledWith(mockHouse);
    });
  });
});
