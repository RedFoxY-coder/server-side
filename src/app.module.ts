import { Module } from '@nestjs/common';
import { CardModule } from './card/card.module';
import { StackModule } from './stack/stack.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from './card/card.entity';
import { UserRole } from './role/role-user.entity';
import { Role } from './role/role.entity';
import { Stack } from './stack/stack.entity';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [CardModule, StackModule, ConfigModule.forRoot(), UserModule, RoleModule, SequelizeModule.forRoot({
       dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'redFoxy',
        database: 'memoryCards',
        models: [Card, Stack, User, Role, UserRole],
         autoLoadModels: true,
      synchronize: true,
  }), SequelizeModule.forFeature([Card, Stack, User, Role, UserRole]), AuthModule],

})
export class AppModule {}
