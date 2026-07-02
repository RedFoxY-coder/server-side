import { Table, Column, Model } from 'sequelize-typescript';
import { Card } from 'src/card/card.entity';
@Table
export class Stack extends Model {
  @Column({
    allowNull: false,
  })
  name: string;
}
