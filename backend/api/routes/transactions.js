const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

router.get('/test', (req, res) => {
  res.json('test ok');
});

router.post('/transaction', async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const {name, price, description, datetime} = req.body;
  const transaction = await Transaction.create({name, price, description, datetime});
  res.json(transaction);
});

router.get('/transactions', async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();
  res.json(transactions);
});

module.exports = router;