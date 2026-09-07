import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from './card.entity';



@Module({
imports: [SequelizeModule.forFeature([Card])],
  providers: [CardService],
  controllers: [CardController],
  exports: [CardService],
})
export class CardModule {}
