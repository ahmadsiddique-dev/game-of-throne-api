import { Test, TestingModule } from '@nestjs/testing';
import { HouseService } from './house.service';
import { getModelToken } from '@nestjs/mongoose';
import { House } from './schema/house.schema';
import { NotFoundException } from '@nestjs/common';

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

const mockHouseModel = {
  findOne: jest.fn(),
  find: jest.fn(),
};

function MockHouseModel(dto: any) {
  return { ...dto, save: jest.fn().mockResolvedValue({ ...dto }) };
}
MockHouseModel.findOne = mockHouseModel.findOne;
MockHouseModel.find = mockHouseModel.find;

describe('HouseService', () => {
  let service: HouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HouseService,
        {
          provide: getModelToken(House.name),
          useValue: MockHouseModel,
        },
      ],
    }).compile();

    service = module.get<HouseService>(HouseService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllHouses', () => {
    it('should return all houses', async () => {
      MockHouseModel.find.mockResolvedValue([mockHouse]);
      const result = await service.getAllHouses();
      expect(result).toEqual([mockHouse]);
      expect(MockHouseModel.find).toHaveBeenCalled();
    });
  });

  describe('getHouse', () => {
    it('should throw if name is empty', async () => {
      await expect(service.getHouse('')).rejects.toThrow(NotFoundException);
    });

    it('should throw if house not found', async () => {
      MockHouseModel.findOne.mockResolvedValue(null);
      await expect(service.getHouse('Unknown')).rejects.toThrow(NotFoundException);
    });

    it('should return a house by name', async () => {
      MockHouseModel.findOne.mockResolvedValue(mockHouse);
      const result = await service.getHouse('Stark');
      expect(result).toEqual(mockHouse);
      expect(MockHouseModel.findOne).toHaveBeenCalledWith({ name: 'Stark' });
    });
  });

  describe('createHouse', () => {
    it('should create and return a house', async () => {
      const result = await service.createHouse(mockHouse as any);
      expect(result).toMatchObject(mockHouse);
    });
  });
});
