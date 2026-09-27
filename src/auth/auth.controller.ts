import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from 'src/user/dto/createUserDto';

@Controller('auth')
export class AuthController {
 constructor(private authService: AuthService) {}

 @Post('/login')
 async login(@Body() userDto: createUserDto):  Promise<{token: string}> {
    return this.authService.login(userDto)
 }
 @Post('/registration')
 async registration(@Body() userDto: createUserDto): Promise<{token: string}> {
    return this.authService.registration(userDto)
 }
 
}
