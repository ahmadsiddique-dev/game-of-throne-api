import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/character.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get() 
  async getAllCharacters() {
    return this.characterService.getAllCharacters();
  }
  @Post('create')
  async createCharacter(@Body() createCharacterDto: CreateCharacterDto) {
    console.log('createCharacterDto :>> ', createCharacterDto);
    return this.characterService.createCharacter(createCharacterDto);
  }

  // @Get()
  // async getAttribute(@Query('...:name') ...name: string) {
  //   return this.characterService.getAttributes(...name);
  // }

  @Get(':name')
  async getCharacter(@Param('name') name: string) {
    return this.characterService.getCharacter(name);
  }
}
