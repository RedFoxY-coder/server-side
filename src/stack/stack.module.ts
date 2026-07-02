import { Module } from '@nestjs/common';
import { StackService } from './stack.service';
import { StackController } from './stack.controller';
import { stackProvider } from './stack.provider';
import { CardModule } from 'src/card/card.module';
@Module({
  imports: [CardModule],
  providers: [StackService, ...stackProvider],
  controllers: [StackController],
})
export class StackModule {}
