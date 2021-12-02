import { Producto } from './Producto';
import { Table, Model, Column, DataType, PrimaryKey, BelongsTo } from "sequelize-typescript";

@Table({
    tableName: 'Composicion',
    timestamps: false,
})
export class Composicion extends Model {
    @Column({field: 'comp_cantidad', type: DataType.DECIMAL(12,2)})
    cantidad!: number;

    @PrimaryKey
    @Column({field: 'comp_producto', type: DataType.CHAR(8)})
    productoId!: string;

    @BelongsTo(() => Producto, {foreignKey: 'comp_producto'})
    producto!: Producto;

    @PrimaryKey
    @Column({field: 'comp_componente', type: DataType.CHAR(8)})
    componenteId!: string;

    @BelongsTo(() => Producto, {foreignKey: 'comp_componente'})
    componente!: Producto;
}
