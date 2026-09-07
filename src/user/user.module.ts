import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RoleModule } from 'src/role/role.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [RoleModule, SequelizeModule.forFeature([User])],
  exports: [UserService]
})
export class UserModule {}
