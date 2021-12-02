import { Model, ModelCtor } from 'sequelize-typescript';

export class Cache {
    private static instance: Cache;
    private modelosCacheados: Map<string, any>;


    static getInstance() : Cache {
        if(this.instance == null) {
            this.instance = new Cache();
        }
        return this.instance;
    }

    private constructor() {
        this.modelosCacheados = new Map();
    }

    public agregarModelo <T extends Model> (clase: {new () : T}, modelo: any) {
        let nombre = clase.constructor.name;
        this.modelosCacheados.set(nombre, modelo);
    }

    public modelo <T extends Model> (clase: {new () : T}, key: string|null = null, ) : ModelCtor<T> {
        let nombre = clase.constructor.name;
        let modelo = this.modelosCacheados.get(nombre)!!;
        return key == null? modelo.cache() : modelo.cache(key);
    }

    public borrarDatosModelo <T extends Model> (clase: {new () : T}, key: string) {
        let nombre = clase.constructor.name;
        this.modelosCacheados.get(nombre)!!.cache(key).clear();
    }
}
