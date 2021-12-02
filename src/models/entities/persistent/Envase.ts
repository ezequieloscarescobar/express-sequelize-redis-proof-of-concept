import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'Envases',
    timestamps: false,
})
export class Envase extends Model {
    @PrimaryKey
    @Column({field: 'enva_codigo', type: DataType.NUMBER({precision: 6})})
    id!: number;

    @Column({field: 'enva_detalle', type: DataType.CHAR(50)})
    detalle!: string;
}
