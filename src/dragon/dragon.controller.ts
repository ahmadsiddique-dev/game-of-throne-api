import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DragonService } from './dragon.service';
import { CreateDragonDto } from './dto/dragon.dto';

@Controller('dragon')
export class DragonController {
  constructor (private readonly dragonService: DragonService) {}

  @Get() 
  async getAllDragons() {
    return this.dragonService.getAllDragons();
  }

  @Post('create')
  async createDragon(@Body() createDragonDto: CreateDragonDto) {
    return this.dragonService.createDragon(createDragonDto);
  }

  @Get(':name')
  async getDragon(@Param('name') name: string) {
    return this.dragonService.getDragon(name);
  }
}
