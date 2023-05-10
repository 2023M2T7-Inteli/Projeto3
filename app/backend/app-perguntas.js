const express = require('express');
const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose();
const PATH = "../database/db_obyweb.db";

const app = express();
app.listen(3000)

app.use(express.static("../frontend/"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



/****************************** CRIAR PERGUNTA ********************************************/
//CRUD-CREATE


app.post('/criar_pergunta', (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
    sql = "INSERT INTO Pergunta (pergunta, id_protocolo) VALUES ('"  + req.body.pergunta + "', '"  + req.body.id_protocolo + "')";
    console.log(sql);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }   
    });
    res.write('<p>Pergunta criada com sucesso!</p><a href="/">Voltar</a>');
    db.close(); // Fecha o banco
    res.end();
});


/****************************** ATUALIZAR PERGUNTA ********************************************/
//CRUD-UPDATE


app.put('/atualizar_pergunta', (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
    let sql = "UPDATE Protocolo SET Pergunta = '" + req.body.pergunta + " WHERE ID_PERGUNTA = " + req.body.id_pergunta;
    console.log(sql);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }   
    });
    res.write('<p>Pergunta atualizada com sucesso!</p><a href="/">Voltar</a>');
    db.close(); // Fecha o banco
    res.end();
});
