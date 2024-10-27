require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json('test ok');
});

app.post('/api/transaction', (req, res) => {
    res.json(req.body);
});

app.listen(process.env.PORT);
const port = process.env.PORT;

console.log(`Server will run on port: ${port}`);