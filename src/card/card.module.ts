import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { cardProviders } from './card.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [CardModule, DatabaseModule],
  providers: [CardService, ...cardProviders],
  controllers: [CardController],
  exports: [CardService],
})
export class CardModule {}
