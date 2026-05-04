import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';

const mockCharacter = {
  name: 'Jon Snow',
  house: 'Stark',
  title: 'King in the North',
  isBastard: true,
  noun: 'He',
  description: 'A brave warrior',
  age: 23,
};

const mockCharacterService = {
  getAllCharacters: jest.fn(),
  getCharacter: jest.fn(),
  createCharacter: jest.fn(),
};

describe('CharacterController', () => {
  let controller: CharacterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [
        {
          provide: CharacterService,
          useValue: mockCharacterService,
        },
      ],
    }).compile();

    controller = module.get<CharacterController>(CharacterController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllCharacters', () => {
    it('should return all characters', async () => {
      mockCharacterService.getAllCharacters.mockResolvedValue([mockCharacter]);
      const result = await controller.getAllCharacters();
      expect(result).toEqual([mockCharacter]);
      expect(mockCharacterService.getAllCharacters).toHaveBeenCalled();
    });
  });

  describe('getCharacter', () => {
    it('should return a character by name', async () => {
      mockCharacterService.getCharacter.mockResolvedValue(mockCharacter);
      const result = await controller.getCharacter('Jon Snow');
      expect(result).toEqual(mockCharacter);
      expect(mockCharacterService.getCharacter).toHaveBeenCalledWith('Jon Snow');
    });
  });

  describe('createCharacter', () => {
    it('should create a character', async () => {
      mockCharacterService.createCharacter.mockResolvedValue(mockCharacter);
      const result = await controller.createCharacter(mockCharacter as any);
      expect(result).toEqual(mockCharacter);
      expect(mockCharacterService.createCharacter).toHaveBeenCalledWith(mockCharacter);
    });
  });
});
