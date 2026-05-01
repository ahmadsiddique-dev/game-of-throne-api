import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { MongooseModule } from '@nestjs/mongoose';
import { House, HouseSchema } from './schema/house.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: House.name, schema: HouseSchema}] )
  ],
  controllers: [HouseController],
  providers: [HouseService]
})
export class HouseModule {}
