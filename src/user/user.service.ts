import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { createUserDto } from './dto/createUserDto';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/role.entity';
import { InjectModel } from '@nestjs/sequelize';
import { addRoleDto } from './dto/addRole.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User, 
    private  roleService: RoleService
) {}

    async createUser(createUserDto: createUserDto): Promise<User> {
        if(!createUserDto.email || !createUserDto.password) {
            throw new HttpException('Email или пароль введены некоректно', HttpStatus.BAD_REQUEST)

        }
        const user = await this.userModel.create(createUserDto)
        const role = await this.roleService.getRoleByName('user')
    
        await user.$add('roles', [role?.id])
        const userWithRoles = await this.userModel.findOne({where: {email: createUserDto.email}, include: {'all' : true}})

        if(!userWithRoles) {
            throw new HttpException('Ошибка сервера', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        console.log(userWithRoles)
        return userWithRoles
    }

    async getAll(): Promise<User[]> {
        return this.userModel.findAll({include: {'all' : true}})
    }

    async getById(id: number): Promise<User | null> {
        const user = await this.userModel.findOne({
            where: {
                id
            }, include: Role
        })
        console.log(user)
        return user
    }

    async getByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({
            where: {
                email
            }, include: Role
        })
    }

    async addRole(addRoleDto: addRoleDto): Promise<User> {
        const user = await this.userModel.findByPk(addRoleDto.userId, {include: {'all' : true}})
        const role = await this.roleService.getRoleByName(addRoleDto.role)
         if(!user || !role) {
            throw new HttpException('Пользователь или роле не найдена', HttpStatus.NOT_FOUND)
         }
         await user.$add('roles', role.id)
         return user
    }
}
