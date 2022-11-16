const {Pool} = require('pg');

const connectionData = {
    user: 'postgres',
    host:'postgres',
    port:5432
}

const pool = new Pool(connectionData)
module.exports = {pool}; 