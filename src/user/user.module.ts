import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RoleModule } from 'src/role/role.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [RoleModule, SequelizeModule.forFeature([User]),  JwtModule.register({
        secret: process.env.PRIVATE_KEY || 'secret',
        signOptions: {
          expiresIn: '24h'
        }
      })],
  exports: [UserService]
})
export class UserModule {}
