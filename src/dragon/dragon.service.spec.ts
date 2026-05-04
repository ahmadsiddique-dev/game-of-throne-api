import { Test, TestingModule } from '@nestjs/testing';
import { DragonService } from './dragon.service';
import { getModelToken } from '@nestjs/mongoose';
import { Dragon } from './schema/dragon.schema';
import { BadRequestException } from '@nestjs/common';

const mockDragon = {
  name: 'Drogon',
  age: 5,
  color: 'black',
  isFireBreathing: true,
  rider: ['Daenerys'],
  type: 'FIRE',
  description: 'The largest and most aggressive of the three dragons',
};

const mockDragonModel = {
  findOne: jest.fn(),
  find: jest.fn(),
};

function MockDragonModel(dto: any) {
  return { ...dto, save: jest.fn().mockResolvedValue({ ...dto }) };
}
MockDragonModel.findOne = mockDragonModel.findOne;
MockDragonModel.find = mockDragonModel.find;

describe('DragonService', () => {
  let service: DragonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DragonService,
        {
          provide: getModelToken(Dragon.name),
          useValue: MockDragonModel,
        },
      ],
    }).compile();

    service = module.get<DragonService>(DragonService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllDragons', () => {
    it('should return all dragons', async () => {
      MockDragonModel.find.mockResolvedValue([mockDragon]);
      const result = await service.getAllDragons();
      expect(result).toEqual([mockDragon]);
      expect(MockDragonModel.find).toHaveBeenCalled();
    });
  });

  describe('getDragon', () => {
    it('should throw if name is empty', async () => {
      await expect(service.getDragon('')).rejects.toThrow(BadRequestException);
    });

    it('should return a dragon by name', async () => {
      MockDragonModel.findOne.mockReturnValue(mockDragon);
      const result = await service.getDragon('Drogon');
      expect(result).toEqual(mockDragon);
      expect(MockDragonModel.findOne).toHaveBeenCalledWith({ name: 'Drogon' });
    });
  });

  describe('createDragon', () => {
    it('should create and return a dragon', async () => {
      const result = await service.createDragon(mockDragon as any);
      expect(result).toMatchObject(mockDragon);
    });
  });
});
