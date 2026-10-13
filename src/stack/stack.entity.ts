import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Card } from 'src/card/card.entity';
import { User } from 'src/user/user.entity';

interface StackCreationAttrs {
  name: string
  userId: number
}

@Table({tableName: 'stacks'})
export class Stack extends Model<Stack, StackCreationAttrs> {
  @Column({  
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ForeignKey(() => User)
   @Column({  
    type: DataType.INTEGER,
   
  })
  declare userId: number

  @BelongsTo(() => User)
   declare user: User

   @HasMany(() => Card)
   declare cards: Card[]
}
