const express = require('express');
const time = require('time');
const path = require('path');
const fs = require('fs');
const bodyParser = require("body-parser");
const createTodayFile = require('./utils/createTodayFile');

const JSONParser = bodyParser.json();
const app = express();
const port = 3001;

const now = new time.Date();
now.setTimezone('Europe/Amsterdam', true);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT");
    next();
});

app.listen(port);
console.log(`Сервер запущен на ${port} порту`);


// РУЧКИ

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, `./data/${req.query.user}-${req.query.date}.json`);
    fs.access(filePath, err => {
        if (err) {
            const newFilePath = createTodayFile();
            createTodayFile()
                .then(result => res.sendFile(result), err => res.sendStatus(404));
        } else {
            res.sendFile(filePath);
        }
    });
});

app.put('/', JSONParser, (req, res) => {
    const filePath = path.join(__dirname, `./data/${req.query.user}-${req.query.date}.json`);
    const data = JSON.stringify(req.body);
    fs.writeFile(filePath, data, err => {
        if (err) throw err;
        console.log('Updated!');
    });
    res.end();
});