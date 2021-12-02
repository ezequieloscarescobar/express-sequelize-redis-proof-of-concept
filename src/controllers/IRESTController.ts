import { Request, Response } from 'express';

export interface IRESTController {
    buscarTodos(req: Request, res: Response): void;
    buscar(id: any, req: Request, res: Response): void;
    agregar(req: Request, res: Response): void;
    modificar(id: any, req: Request, res: Response): void;
    eliminar(id: any, req: Request, res: Response): void;
}
