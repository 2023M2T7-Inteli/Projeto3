const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Conexão com o banco de dados
const db = new sqlite3.Database('../database/db_obyweb.db');

// Rota para retornar os protocolos enviados
app.get('/protocolos-enviados', (req, res) => {
  db.all('SELECT * FROM protocolos_enviados', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao consultar o banco de dados.');
    } else {
      res.json(rows);
    }
  });
});

// Rota para retornar os protocolos recebidos
app.get('/protocolos-recebidos', (req, res) => {
  db.all('SELECT * FROM protocolos_recebidos', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao consultar o banco de dados.');
    } else {
      res.json(rows);
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
