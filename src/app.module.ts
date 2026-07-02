import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './card/card.module';
import { StackModule } from './stack/stack.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { cardProviders } from './card/card.provider';
@Module({
  imports: [CardModule, StackModule, ConfigModule.forRoot(), DatabaseModule],
  controllers: [AppController],
  providers: [AppService, ...cardProviders],
})
export class AppModule {}
