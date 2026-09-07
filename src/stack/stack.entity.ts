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
  name: string;

  @ForeignKey(() => User)
   @Column({  
    type: DataType.INTEGER,
   
  })
  userId: number

  @BelongsTo(() => User)
   user: User

   @HasMany(() => Card)
   cards: Card[]
}
