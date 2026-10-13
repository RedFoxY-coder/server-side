import {  Column, DataType, Model, Table } from "sequelize-typescript";

interface RoleCreationAttrs {
   role: string,
   description: string
}


@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
 @Column({
    type: DataType.STRING,
    allowNull: false
 })
 declare role: string;

 @Column({
    type: DataType.STRING,
    allowNull: false,
 })
 declare description: string
}