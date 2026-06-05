const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.get('/', (req, res) => {
    res.send('HELLO VERCEL');
});

app.get('/ping', (req, res) => {
    res.json({ ok: true });
});

module.exports = serverless(app);