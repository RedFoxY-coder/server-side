import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Card extends Model {
  @Column({
    allowNull: false,
  })
  titleEn: string;

  @Column({
    allowNull: false,
  })
  titleRu: string;

  @Column({
    allowNull: true,
  })
  transcription: string;

  @Column({})
  frontSide: string;

  @Column({})
  backSide: string;

  @Column({
    allowNull: false,
    defaultValue: 1,
  })
  level: number;
}
