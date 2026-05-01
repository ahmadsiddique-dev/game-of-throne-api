import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './character/character.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HouseModule } from './house/house.module';
import { DragonModule } from './dragon/dragon.module';

@Module({
  imports: [
    CharacterModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(`${process.env.MONGO_URI}/got`),
    HouseModule,
    DragonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
