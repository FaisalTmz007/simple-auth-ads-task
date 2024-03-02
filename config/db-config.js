const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    "development": {
        "databases": {
            "Database1": {
                "database": process.env.MYSQL_DATABASE1,
                "username": process.env.MYSQL_USERNAME,
                "password": process.env.MYSQL_PASSWORD,
                "host": "127.0.0.1",
                "dialect": "mysql",
                "port": process.env.MYSQL_PORT
            },
            "Database2": {
                "database": process.env.MYSQL_DATABASE2,
                "username": process.env.MYSQL_USERNAME,
                "password": process.env.MYSQL_PASSWORD,
                "host": "127.0.0.1",
                "dialect": "mysql",
                "port": process.env.MYSQL_PORT
            },
        },
    }
}