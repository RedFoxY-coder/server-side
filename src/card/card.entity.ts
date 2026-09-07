import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Stack } from 'src/stack/stack.entity';




@Table({tableName: 'cards'})
export class Card extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  titleEn: string;

  @Column({
      type: DataType.STRING,
    allowNull: false,
  })
  titleRu: string;

  @Column({
      type: DataType.STRING,
  })
  transcription: string;

  @Column({
      type: DataType.STRING,
  })
  frontSide: string;

  @Column({
      type: DataType.STRING,
  })
  backSide: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  level: number;

  @ForeignKey(() => Stack)
  @Column({
    type: DataType.INTEGER
  })
  stackId: number

  @BelongsTo(() => Stack)
  stack: Stack
}
