const {Pool} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('connected to db')
});

const createFileTable    = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS files(id UUID PRIMARY KEY, name VARCHAR(30) UNIQUE NOT NULL, content VARCHAR(100000), owner_id UUID NOT NULL, FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE)`;

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

const createUserTable = () => {
    const queryText =`CREATE TABLE IF NOT EXISTS users( id UUID PRIMARY KEY, email VARCHAR(128) UNIQUE NOT NULL, password VARCHAR(128) NOT NULL)`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const dropFileTable = () => {
    const queryText = 'DROP TABLE IF EXISTS files returning *';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const dropUserTable = () => {
    const queryText = 'DROP TABLE IF EXISTS users returning *';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const createAllTables = () => {
    createUserTable();
    createFileTable();
};

const dropAllTables = () => {
    dropUserTable();
    dropFileTable();
};

pool.on('remove', () => {
    console.log("client removed");
    process.exit(0);
});

module.exports = {
    createFileTable,
    createUserTable,
    createAllTables,
    dropUserTable,
    dropFileTable,
    dropAllTables
};

require('make-runnable');