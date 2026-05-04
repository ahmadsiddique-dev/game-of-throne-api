import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './character.service';
import { getModelToken } from '@nestjs/mongoose';
import { Character } from './schema/character.schema';
import { ConflictException } from '@nestjs/common';

const mockCharacter = {
  name: 'Jon Snow',
  house: 'Stark',
  title: 'King in the North',
  isBastard: true,
  noun: 'He',
  description: 'A brave warrior',
  age: 23,
};

const mockCharacterModel = {
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
};

function MockCharacterModel(dto: any) {
  return { ...dto, save: jest.fn().mockResolvedValue({ ...dto }) };
}
MockCharacterModel.findOne = mockCharacterModel.findOne;
MockCharacterModel.find = mockCharacterModel.find;

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          provide: getModelToken(Character.name),
          useValue: MockCharacterModel,
        },
      ],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllCharacters', () => {
    it('should return all characters', async () => {
      MockCharacterModel.find.mockResolvedValue([mockCharacter]);
      const result = await service.getAllCharacters();
      expect(result).toEqual([mockCharacter]);
      expect(MockCharacterModel.find).toHaveBeenCalled();
    });
  });

  describe('getCharacter', () => {
    it('should return a character by name', async () => {
      MockCharacterModel.findOne.mockResolvedValue(mockCharacter);
      const result = await service.getCharacter('Jon Snow');
      expect(result).toEqual(mockCharacter);
      expect(MockCharacterModel.findOne).toHaveBeenCalledWith({ name: 'Jon Snow' });
    });

    it('should throw if name is empty', async () => {
      await expect(service.getCharacter('')).rejects.toThrow(ConflictException);
    });

    it('should throw if character not found', async () => {
      MockCharacterModel.findOne.mockResolvedValue(null);
      await expect(service.getCharacter('Unknown')).rejects.toThrow(ConflictException);
    });
  });

  describe('createCharacter', () => {
    it('should create and return a character', async () => {
      const result = await service.createCharacter(mockCharacter as any);
      expect(result).toMatchObject(mockCharacter);
    });
  });
});
