import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createUserDto } from 'src/user/dto/createUserDto';
import { UserService } from 'src/user/user.service';
import * as bcryptjs from 'bcryptjs'
import { TokenService } from 'src/token/token.service';
@Injectable()
export class AuthService {

    constructor( private userService: UserService,
        private tokenService: TokenService
    ){}

    async registration(userDto: createUserDto):  Promise<{token: string}> {
        const candidate = await this.userService.getByEmail(userDto.email)

        if(candidate) throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)

        const hashPassword = await bcryptjs.hash(userDto.password, 5)

        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.tokenService.generateToken({email: user.email, id: user.id, roles: user.roles})
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
        return this.tokenService.generateToken({email: user.email, id: user.id, roles: user.roles})

    }
}
