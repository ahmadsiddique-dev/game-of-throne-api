import { Module } from '@nestjs/common';
import { DragonController } from './dragon.controller';
import { DragonService } from './dragon.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dragon, DragonSchema } from './schema/dragon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Dragon.name, schema: DragonSchema}])
  ],
  controllers: [DragonController],
  providers: [DragonService]
})
export class DragonModule {}
