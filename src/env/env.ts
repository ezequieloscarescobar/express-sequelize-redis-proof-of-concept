export const env =  {
    REDIS_HOST: 'localhost',
    REDIS_PORT: 6379,
    REDIS_IP_FAMILY: 4,
    REDIS_NAMESPACE: 'model',
    REDIS_LIFETIME: 60*60,

    SEQUELIZE_DATABASE: 'example',
    SEQUELIZE_DIALECT: 'mssql',
    SEQUELIZE_USERNAME: 'username',
    SEQUELIZE_PASSWORD: 'password',
    SEQUELIZE_HOST: 'localhost',
    SEQUELIZE_MODELS: '/models/entities/persistent',

    SERVER_PORT: 3000,
}
