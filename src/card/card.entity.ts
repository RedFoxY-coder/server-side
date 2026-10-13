import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Stack } from 'src/stack/stack.entity';

interface CardCreationAttrs {
  titleEn: string,
  titleRu: string,
  level: number,
  stackId: number
}


@Table({tableName: 'cards'})
export class Card extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare titleEn: string;

  @Column({
      type: DataType.STRING,
    allowNull: false,
  })
  declare titleRu: string;

  @Column({
      type: DataType.STRING,
  })
  declare transcription: string;

  @Column({
      type: DataType.STRING,
  })
  declare frontSide: string;

  @Column({
      type: DataType.STRING,
  })
  declare backSide: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  declare level: number;

  @ForeignKey(() => Stack)
  @Column({
    type: DataType.INTEGER
  })
  declare stackId: number

  @BelongsTo(() => Stack)
  declare stack: Stack
}
