import { Router } from './Router';

import express from 'express';

export class Servidor {
    private router: Router;
    private app: express.Application|any;

    constructor(
        private puerto: number = 3000
    ) {
        this.app = express();
        this.app.use(express.json());
        this.router = new Router(this.app);
    }

    escuchar() {
        this.app.listen(this.puerto, () => {
            console.log('Servidor levantado y escuchando en el puerto ' + this.puerto);
        });
    }
}
