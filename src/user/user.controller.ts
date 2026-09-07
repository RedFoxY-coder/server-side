import { Body, Controller, Post, Get, Param, ParseIntPipe } from '@nestjs/common';
import { createUserDto } from './dto/createUserDto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { addRoleDto } from './dto/addRole.dto';

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
    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User | null>{
        return this.userService.getById(id)
    }
    @Post('/addRole')
    async addRole(@Body() addRoleDto: addRoleDto): Promise<User> {
        return this.userService.addRole(addRoleDto)
    }
}
