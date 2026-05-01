import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/house.dto';

@Controller('house')
export class HouseController {
  constructor (private readonly houseService: HouseService) {}

  @Get() 
  async getAllHouses(){
    return this.houseService.getAllHouses();
  }

  @Post('create')
  async createHouse(@Body() createHouseDto: CreateHouseDto) {
    return this.houseService.createHouse(createHouseDto);
  }

  @Get(':name')
  async getHouse(@Param('name') name: string) {
    return this.houseService.getHouse(name);
  }
}
