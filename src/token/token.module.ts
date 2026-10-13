import { Module } from '@nestjs/common';
import { Token } from './token.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
@Module({
    imports: [SequelizeModule.forFeature([Token]), JwtModule.register({
          secret: process.env.PRIVATE_KEY || 'secret',
          signOptions: {
            expiresIn: '24h'
          }
        })],
        providers: [TokenService],
        exports: [TokenService]
})
export class TokenModule {}
