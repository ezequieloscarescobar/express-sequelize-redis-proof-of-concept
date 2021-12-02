import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'Rubro',
    timestamps: false,
})
export class Rubro extends Model {
    @PrimaryKey
    @Column({field: 'rubr_id', type: DataType.CHAR(4)})
    id!: string;

    @Column({field: 'rubr_detalle', type: DataType.CHAR(50)})
    detalle!: string;
}
