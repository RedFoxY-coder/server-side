
import { Column, DataType, Table, Model, BelongsToMany, HasMany } from "sequelize-typescript";
import { UserRole } from "src/role/role-user.entity";
import { Role } from "src/role/role.entity";
import { Stack } from "src/stack/stack.entity";

interface UserCreationAttrs{
    email: string,
    password: string
}

@Table({tableName: 'users'})

export class User extends Model<User, UserCreationAttrs> {

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string

    @Column({
         type: DataType.STRING,
          allowNull: false,
    })
    password: string

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[]

    @HasMany(() => Stack)
    stacks: Stack[]
}