
import { Column, DataType, Table, Model, BelongsToMany, HasMany, AllowNull, HasOne } from "sequelize-typescript";
import { UserRole } from "src/role/role-user.entity";
import { Role } from "src/role/role.entity";
import { Stack } from "src/stack/stack.entity";
import { Token } from "src/token/token.entity";

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
    declare email: string

    @Column({
         type: DataType.STRING,
          allowNull: false,
    })
    declare password: string

    @Column({
        type: DataType.BOOLEAN,
    })
    declare isActivation: boolean

    @Column({
        type: DataType.STRING
    })
    declare activationLink: string
   

    @BelongsToMany(() => Role, () => UserRole)
    declare roles: Role[]

    @HasMany(() => Stack)
    declare stacks: Stack[]

    @HasOne(() => Token)
    declare token: Token
    
}