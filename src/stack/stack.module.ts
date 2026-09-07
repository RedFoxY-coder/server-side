import { Module } from '@nestjs/common';
import { StackService } from './stack.service';
import { StackController } from './stack.controller';
import { CardModule } from 'src/card/card.module';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stack } from './stack.entity';
@Module({
  imports: [CardModule, UserModule, SequelizeModule.forFeature([Stack])],
  providers: [StackService],
  controllers: [StackController],
})
export class StackModule {}
