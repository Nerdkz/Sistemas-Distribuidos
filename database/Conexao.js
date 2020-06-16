const { Sequelize } = require( "sequelize" );

const sequelize = new Sequelize(
    'ec021_2020_1', 
    'root', 
    'Mendonca007', 
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;