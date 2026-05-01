import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dragon, DragonDocument } from './schema/dragon.schema';
import { Model } from 'mongoose';
import { CreateDragonDto } from './dto/dragon.dto';

@Injectable()
export class DragonService {
  constructor(
    @InjectModel(Dragon.name) private dragonModel: Model<DragonDocument>,
  ) {}

  async getAllDragons() {
    return this.dragonModel.find();
  }

  async getDragon(name: string) {
    if (!name) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        success: false,
        message: 'Dragon name is required',
      });
    }
    const result =  this.dragonModel.findOne({ name });

    if (!result) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        success: false,
        message: 'Dragon not found',
      });
    }
    return result;
  }

  async createDragon(createDragonDto: CreateDragonDto) {
    const createdDragon = new this.dragonModel(createDragonDto);
    return createdDragon.save();
  }
}
