import { Sequelize } from 'sequelize-typescript';

export class Config {
    private static instance: Config;
    sequelize!: Sequelize;

    static getInstance() : Config {
        if(this.instance == null) {
            this.instance = new Config();
        }
        return this.instance;
    }

    private constructor() {

    }
}
