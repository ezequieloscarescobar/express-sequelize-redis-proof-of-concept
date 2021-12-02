import { env } from './env/env';
import { Producto } from './models/entities/persistent/Producto';
import { Sequelize } from "sequelize-typescript";
import { Servidor } from "./server/Servidor";
import { Config } from './services/Config';
import IORedis from "ioredis";
import { Cache } from "./services/Cache";

/* ------------------------------------------ CACHE -------------------------------------------------*/
const redis = new IORedis(env.REDIS_PORT, env.REDIS_HOST);

const RedisAdaptor = require('sequelize-transparent-cache-ioredis');
const redisAdaptor = new RedisAdaptor({
    client: redis,
    namespace: env.REDIS_NAMESPACE,
    lifetime: env.REDIS_LIFETIME
});

const sequelizeCache = require('sequelize-transparent-cache');
const { withCache } = sequelizeCache(redisAdaptor);

const cachearModelos = () => {
    const ProductoModel = withCache(sequelize.model('Producto'));
    Cache.getInstance().agregarModelo(Producto, ProductoModel);
}
/* ------------------------------------------ END CACHE ---------------------------------------------*/


/* ------------------------------------------ SEQUELIZE ---------------------------------------------*/
const sequelize = new Sequelize({
    database: env.SEQUELIZE_DATABASE,
    dialect: 'mssql',
    username: env.SEQUELIZE_USERNAME,
    password: env.SEQUELIZE_PASSWORD,
    host: env.SEQUELIZE_HOST,
    models: [__dirname + env.SEQUELIZE_MODELS]
});

sequelize.authenticate().then(() => {
    console.log('Conectado correctamente!');
    Config.getInstance().sequelize = sequelize;
    cachearModelos();
});

/* ------------------------------------------ END SEQUELIZE -----------------------------------------*/

/* ------------------------------------------ SERVER ------------------------------------------------*/
const servidor = new Servidor(env.SERVER_PORT);
servidor.escuchar();
/* ------------------------------------------ END SERVER --------------------------------------------*/