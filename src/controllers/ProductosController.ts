import { Config } from './../services/Config';
import { Producto } from './../models/entities/persistent/Producto';
import { IRESTController } from './IRESTController';
import { Request, Response } from 'express';
import { Cache } from '../services/Cache';

export class ProductosController implements IRESTController {
    private contador: number = 0;

    buscarTodos(req: Request, res: Response): void {
        if(this.contador == 2) {
            Cache.getInstance().borrarDatosModelo(Producto, 'productos');
            this.contador = 0;
        }

        Cache.getInstance().modelo<Producto>(Producto, 'productos').findAll().then((productos: Producto[]|any[]) => {
            res.json(productos);
        });

        this.contador++;
    }

    buscar(id: any, req: Request, res: Response): void {
        Cache.getInstance().modelo<Producto>(Producto).findByPk(id).then((producto: Producto|null) => {
            producto?.rubro;
            res.json(producto);
        });
    }

    agregar(req: Request, res: Response): void {
        // TRANSACCION ADMINISTRADA
        Config.getInstance().sequelize.transaction((t) => {
            
            return Cache.getInstance().modelo<Producto>(Producto).create(req.body, {transaction: t});
        })
        .then(() => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    }

    modificar(id: any, req: Request, res: Response): void {
        Config.getInstance().sequelize.transaction(async (t) => {
            const producto = await Cache.getInstance().modelo<Producto>(Producto).findByPk(id);
            producto?.set(req.body);
            return producto?.save({transaction: t});
        })
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    }

    eliminar(id: any, req: Request, res: Response): void {
        // TRANSACCION NO ADMINISTRADA
        Config.getInstance().sequelize.transaction().then(t => {

            Cache.getInstance().modelo<Producto>(Producto).findByPk(id).then((producto: Producto|null) => {
                producto?.destroy({transaction: t})
                .then(async() => {
                    await t.commit();
                    res.sendStatus(200);
                })
                .catch(async (error) => {
                    await t.rollback();
                    res.sendStatus(500);
                });
            });

        });
    }
}
