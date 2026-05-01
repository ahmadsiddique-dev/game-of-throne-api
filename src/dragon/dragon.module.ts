import { Module } from '@nestjs/common';
import { DragonController } from './dragon.controller';
import { DragonService } from './dragon.service';

@Module({
  controllers: [DragonController],
  providers: [DragonService]
})
export class DragonModule {}
