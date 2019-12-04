const {Pool} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('connected to db')
});

const createTables = () => {
    const queryText = "CREATE TABLE IF NOT EXISTS FILES(id UUID PRIMARY KEY, name VARCHAR(30) UNIQUE NOT NULL , content VARCHAR(100000))";

    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        })
};

pool.on('remove', () => {
    console.log("client removed");
    process.exit(0);
});

module.exports = {createTables};

require('make-runnable');