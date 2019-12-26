const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require("body-parser");

const JSONParser = bodyParser.json();
const app = express();
const port = 3001;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT");
    next();
});

app.listen(port);
console.log(`Сервер запущен на ${port} порту`);


app.get('/', (req, res) => {
    const filePath = path.join(__dirname, `./data/${req.query.user}-${req.query.date}.json`);
    fs.access(filePath, err => {
        if (err) {
            res.status(404).send('Файл по данному пути не найден');
        } else {
            res.sendFile(filePath);
        }
    });
});

app.put('/', JSONParser, (req, res) => {
    const filePath = path.join(__dirname, `./data/test.json`);
    const data = JSON.stringify(req.body);
    fs.writeFile(filePath, data, err => {
        if (err) throw err;
        console.log('Saved!');
    });
    res.end();
});