import { Role } from "src/role/role.entity"

export class payloadDto {
    declare email: string
    declare id: number
    declare roles: Role[]
}