import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './character/character.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HouseModule } from './house/house.module';
import { DragonModule } from './dragon/dragon.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: `${configService.get<string>('MONGO_URI')}/got`,
      }),
      inject: [ConfigService],
    }),
    CharacterModule,
    HouseModule,
    DragonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
