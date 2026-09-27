import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from 'src/user/dto/createUserDto';
import { UserService } from 'src/user/user.service';
import * as bcryptjs from 'bcryptjs'
import { User } from 'src/user/user.entity';
import { throws } from 'assert';
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

    async login(userDto: createUserDto): Promise<{token: string}> {
        const user = await this.userService.getByEmail(userDto.email)
        if(!user) {
            throw new HttpException('Неверный email', HttpStatus.BAD_REQUEST)
        }
        const checkPassword =  await bcryptjs.compare(userDto.password, user.dataValues.password)

        if(!checkPassword) {
            throw new HttpException("Неверный пароль", HttpStatus.BAD_REQUEST)
        }
        return this.generateToken(user)

    }

    
    async generateToken(user: User): Promise<{token: string}> {
        const payload = {
            email: user.dataValues.email,
            id: user.id,
            roles: user.dataValues.roles
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
