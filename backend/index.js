require('dotenv').config();
const express = require('express');
const cors = require('cors');
const transactionRoutes = require('./api/routes/transactions');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', transactionRoutes);

app.listen(process.env.PORT);
const port = process.env.PORT;
console.log(`Server will run on port: ${port}`);