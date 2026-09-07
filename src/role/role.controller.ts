import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { createRoleDto } from './dto/createDto';
import { Role } from './role.entity';

@Controller('role')
export class RoleController {
constructor( private readonly roleService: RoleService) {}

    @Post() 
    async createRole(@Body() dto: createRoleDto): Promise<Role> {
        return this.roleService.createRole(dto)
    }
    @Get()
    async getAllRoles(): Promise<Role[]> {
        return this.roleService.getAll()
    }
    @Get(':role')
    async getByName(@Param('role') role: string): Promise<Role | null>{
        return this.roleService.getRoleByName(role)
    }
}
