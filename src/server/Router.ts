import { ProductosRoutes } from './routes/ProductosRoutes';
import { ProductosController } from './../controllers/ProductosController';
import { Router as r, Request, Response } from 'express';

import express from 'express';

export class Router {

    constructor(private app: express.Application) {
        this.inicializar();
    }

    private inicializar() {
        this.app.get('/', async (req: Request|any, res: Response|any) => {
           res.end('Hola mundo!');
        });

        this.app.use('/productos', new ProductosRoutes().router);
    }
}
