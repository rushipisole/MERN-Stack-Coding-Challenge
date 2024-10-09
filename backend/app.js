const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase');

// Define the schema for the transactions collection
const transactionSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: Date
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// API to initialize the database
app.get('/initialize', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;
        await Transaction.insertMany(transactions);
        res.send('Database initialized successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error initializing database');
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});