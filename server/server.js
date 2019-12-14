const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

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
    })
});