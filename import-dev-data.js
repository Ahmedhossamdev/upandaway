const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'});
const mongoose = require('mongoose');
const Tour = require('./server/models/Tours');
const connectDB = require('./server/config/db');

connectDB();

//Read JSON FILE

const tours = JSON.parse(fs.readFileSync('server/data/tours-simple.json', 'utf-8'));

// IMPORT DATA INTO DB

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded');

    } catch (err) {
        console.log(err);
    }
    process.exit(0);
};

// DELETE ALL DATA FROM COLLECTION

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted');

    } catch (err) {
        console.log(err);
    }
    process.exit(0);
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}

console.log(process.argv);

