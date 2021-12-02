import { ProductosController } from './../../controllers/ProductosController';

import { Router as r, Router } from 'express';

export class ProductosRoutes {
    public router: r;

    private controller = new ProductosController();

    constructor() {
        this.router = r();
        this.inicializar();
    }

    private inicializar() {
        this.router.route('/')
        .get((req, res) => this.controller.buscarTodos(req, res))
        .post((req, res) => this.controller.agregar(req, res));

        this.router.route('/:id')
        .get((req, res) => this.controller.buscar(req.params.id, req, res))
        .put((req, res) => this.controller.modificar(req.params.id, req, res))
        .delete((req, res) => this.controller.eliminar(req.params.id, req, res));
    }
}
