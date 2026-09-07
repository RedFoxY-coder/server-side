import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "src/user/user.entity";
import { Role } from "./role.entity";

@Table({tableName: 'user_role'})

export class UserRole extends Model<UserRole> {
 
    @ForeignKey(() => User)
     @Column({  
        type: DataType.INTEGER,
      })
      userId: number;
      
    @ForeignKey(() => Role)  
    @Column({  
          type: DataType.INTEGER,
        })
        roleId: number;
}