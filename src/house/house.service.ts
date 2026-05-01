import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { House, HouseDocument } from './schema/house.schema';
import { Model } from 'mongoose';
import { CreateHouseDto } from './dto/house.dto';

@Injectable()
export class HouseService {
  constructor (@InjectModel(House.name) private houseModel: Model<HouseDocument>) {}

  async getAllHouses() {
    return this.houseModel.find();
  }
  
  async getHouse(name: string) {
    if (!name) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        success: false,
        message: 'House name is required',
      })
    }

    const house = await this.houseModel.findOne({ name });

    if (!house) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        success: false,
        message: `House with name ${name} not found`,
      })
    }
    return house;
  }

  async createHouse(createHouseDto: CreateHouseDto): Promise<House> {
    const createdHouse = new this.houseModel(createHouseDto);
    return createdHouse.save();
  }
}
