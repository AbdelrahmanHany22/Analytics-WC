
require('dotenv').config();
const { default: mongoose } = require('mongoose');
const app = require("./app");


process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION. Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});


const port = 5009;
const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


process.on('unhandledRejection', err => {
    console.log(err);
    console.log('UNHANDLED REJECTION. Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

const uri = process.env.DATABASE_STRING;

mongoose.connect(uri)

const connection = mongoose.connection;

connection.once('open',() => {
    console.log('mongodb database connection successful')
})

