import { Envase } from './Envase';
import { Rubro } from './Rubro';
import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'Producto',
    timestamps: false,
})
export class Producto extends Model {
    @PrimaryKey
    @Column({field: 'prod_codigo', type: DataType.CHAR(8)})
    codigo!: string;

    @Column({field: 'prod_detalle', type: DataType.CHAR(50)})
    detalle!: string;

    @Column({field: 'prod_precio', type: DataType.DECIMAL(12,2)})
    precio!: number;

    @Column({field: 'prod_familia', type: DataType.CHAR(3)})
    familia!: string;

    @ForeignKey(() => Rubro)
    @Column({field: 'prod_rubro', type: DataType.CHAR(4)})
    rubro_id!: string;

    @BelongsTo(() => Rubro, {foreignKey: 'prod_rubro'})
    rubro!: Rubro;

    @ForeignKey(() => Envase)
    @Column({field: 'prod_envase', type: DataType.NUMBER({precision: 6, scale: 0})})
    envase_id!: number;

    @BelongsTo(() => Envase, {foreignKey: 'prod_envase'})
    envase!: Envase;
}
