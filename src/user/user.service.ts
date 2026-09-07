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

    async createUser(dto: createUserDto): Promise<User> {
        const user = await this.userModel.create(dto)
        const role = await this.roleService.getRoleByName('user')
        await user.$set('roles', [role?.id])
        return user
    }

    async getAll(): Promise<User[]> {
        return this.userModel.findAll({include: {'all' : true}})
    }

    async getById(id: number): Promise<User | null> {
        return this.userModel.findOne({
            where: {
                id
            }, include: Role
        })
    }

    async getByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({
            where: {
                email
            }, include: Role
        })
    }

    async addRole(addRoleDto: addRoleDto): Promise<User> {
        const user = await this.userModel.findByPk(addRoleDto.userId)
        const role = await this.roleService.getRoleByName(addRoleDto.role)
         if(!user || !role) {
            throw new HttpException('Пользователь или роле не найдена', HttpStatus.NOT_FOUND)
         }
         await user.$add('roles', role.id)
         return user
    }
}
