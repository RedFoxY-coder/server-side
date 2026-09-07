import { Inject, Injectable } from '@nestjs/common';
import { Role } from './role.entity';
import { createRoleDto } from './dto/createDto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RoleService {

    constructor( @InjectModel(Role) private roleModel: typeof Role
) {}

    async createRole(dto: createRoleDto): Promise<Role> {
        const role = await this.roleModel.create(dto)
        return role
    }

    async getAll(): Promise<Role[]> {
        return this.roleModel.findAll()
    }

    async getRoleByName(role: string): Promise<Role | null> {
        return this.roleModel.findOne({
            where: {
                role
            }
        })
    }
}
