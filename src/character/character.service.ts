import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/character.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Character, CharacterDocument } from './schema/character.schema';
import { Model } from 'mongoose';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
  ) {}

  async getCharacter(name: string) {
    if (!name) {
      throw new ConflictException({
        status: HttpStatus.BAD_REQUEST,
        success: false,
        error: 'Name is required',
      });
    }
    const result = await this.characterModel.findOne({ name });

    if (!result) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        success: false,
        error: 'User already exists',
      });
    }
    return result;
  }

  async createCharacter(createCharacterDto: CreateCharacterDto) {
    const createdCharacter = new this.characterModel(createCharacterDto);
    console.log('This one is : ', createCharacterDto);
    return createdCharacter.save();
  }

  async getAllCharacters() {
    return this.characterModel.find();
  }
  
  // TODO: Backlog
  // async getAttributes(...name: string) {
  //   return name;
  // }
}
