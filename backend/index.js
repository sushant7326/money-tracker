require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const Transaction = require('./api/models/Transaction.js');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json('test ok');
});

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const {name, price, description, datetime} = req.body;
    const transaction = await Transaction.create({name, price, description, datetime});
    res.json(transaction);
});

app.get('/api/transactions', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
});

app.listen(process.env.PORT);
const port = process.env.PORT;

console.log(`Server will run on port: ${port}`);