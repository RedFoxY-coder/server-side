import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from 'src/user/user.entity';

@Table({tableName: 'token'})
export class Token extends Model<Token> {
  @Column({  
    type: DataType.STRING,
    allowNull: false,
  })
  declare refreshToken: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  declare userId: number

  @BelongsTo(() => User)
  declare user: User
}
