const config = require('./config');

module.exports = {
    development: {
        username: config.database.user,
        password: config.database.password,
        database: config.database.database,
        port: config.database.port,
        host: config.database.host,
        dialect: config.database.connection,
        timezone: config.database.timezone,
    },
};
