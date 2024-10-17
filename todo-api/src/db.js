const {MongoClient} = require('mongodb')

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url)
let db;

const connectToDb = async () => {
    try {
        await client.connect();
        db = client.db('todoList'); // create the todoList database
        console.log('Connected to todoList database');
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
        throw new Error('Database connection failed');
    }
};

const getDb = () => {
    if (!db) {
        throw new Error('Database not connected!');
    }
    return db;
};

module.exports = {connectToDb, getDb}