import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from 'src/user/dto/createUserDto';
import { UserService } from 'src/user/user.service';
import * as bcryptjs from 'bcryptjs'
import { User } from 'src/user/user.entity';
@Injectable()
export class AuthService {

    constructor( private userService: UserService,
        private jwtService: JwtService,
    ){}

    async registration(userDto: createUserDto):  Promise<{token: string}> {
        const candidate = await this.userService.getByEmail(userDto.email)

        if(candidate) throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)

        const hashPassword = await bcryptjs.hash(userDto.password, 5)

        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    async generateToken(user: User): Promise<{token: string}> {
        console.log(user)
        const payload = {
            email: user.email,
            id: user.id,
            roles: user.roles
        }
        console.log(payload)
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
