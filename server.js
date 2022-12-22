const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(
    cors({
        origin: 'http://localhost:4200'
    })
);
app.use(bodyParser.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'controle_estoque'
});

app.get('/api/products', (req, res) => {
    connection.query('SELECT * FROM products', (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

app.post('/api/product-store', (req, res) => {
    const produt = req.body;

    connection.query('INSERT INTO products (name, qtd) VALUES (?, ?)', [produt._name, produt._qtd],
        (error, results) => {
            if (error) throw error;
            console.log(results.affectedRows + ' row(s) affected');
        });
});


app.listen(3000, () => {
    console.log('API listening on port 3000');
});