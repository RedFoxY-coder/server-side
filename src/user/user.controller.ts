import { Body, Controller, Post, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { createUserDto } from './dto/createUserDto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { addRoleDto } from './dto/addRole.dto';
import { AuthGuard } from 'src/auth/authGuard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    async createUser(@Body() data: createUserDto): Promise<User> {
        return this.userService.createUser(data)
    }
    @Get()
    async getAllUsers(): Promise<User[]>{
        return this.userService.getAll()
    }
    @Get('byEmail/:email')
    async getUserByEmail(@Param('email') email: string): Promise<User | null> {
        return this.userService.getByEmail(email)
    }
    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User | null>{
        return this.userService.getById(id)
    }
    @UseGuards(AuthGuard)
    @Post('/addRole')
    async addRole(@Body() addRoleDto: addRoleDto): Promise<User> {
        return this.userService.addRole(addRoleDto)
    }
}
