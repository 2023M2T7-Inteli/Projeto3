const express = require('express');
const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose();
const PATH = "../database/db_obyweb.db";

const app = express();
app.listen(3000)

app.use(express.static("../frontend/"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



/****************************** CRIAR PROTOCOLO ********************************************/
//CRUD-CREATE


app.post('/criar_protocolo', (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
	sql = "INSERT INTO Protocolo (nome, descricao, data_limite, estado) VALUES ('" + req.body.nome + "', '" + req.body.descricao + "', '" + req.body.data_limite + "', '" + req.body.estado + "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>Campo atualizado com sucesso!</p><a href="/">Voltar</a>');
	db.close(); // Fecha o banco
	res.end();
})



/****************************** ATUALIZAR DADOS DO PROTOCOLO ********************************************/
// CRUD-UPDATE 

//  ATUALIZA O CAMPO "DESCRICAO" NA TABELA "PROTOCOLO" - LETRA U NO CRUD
app.put('/atualizar_descricao_protocolo', (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
    let sql = "UPDATE Protocolo SET DESCRICAO = '" + req.body.descricao + "' WHERE ID_PROTOCOLO = " + req.body.id_protocolo;
    console.log(sql);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }   
    });
    res.write('<p>Campo atualizado com sucesso!</p><a href="/">Voltar</a>');
    db.close(); // Fecha o banco
    res.end();
});


//  ATUALIZA O CAMPO "NOME" NA TABELA "PROTOCOLO" - LETRA U NO CRUD
app.put('/atualizar_nome_protocolo', (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
    let sql = "UPDATE Protocolo SET NOME = '" + req.body.nome + "' WHERE ID_PROTOCOLO = " + req.body.id_protocolo;
    console.log(sql);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }   
    });
    res.write('<p>Nome atualizado com sucesso!</p><a href="/">Voltar</a>');
    db.close(); // Fecha o banco
    res.end();
});


//  ATUALIZA O CAMPO "DATA_LIMITE" NA TABELA "PROTOCOLO" - LETRA U NO CRUD
app.put('/atualizar_nome_protocolo', (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
    let sql = "UPDATE Protocolo SET DATA_LIMITE = '" + req.body.data_limite + "' WHERE ID_PROTOCOLO = " + req.body.id_protocolo;
    console.log(sql);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }   
    });
    res.write('<p>Nome atualizado com sucesso!</p><a href="/">Voltar</a>');
    db.close(); // Fecha o banco
    res.end();
});



//  ATUALIZA O CAMPO "ESTADO" NA TABELA "PROTOCOLO" - LETRA U NO CRUD
app.put('/atualizar_estado_protocolo', (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
    let sql = "UPDATE Protocolo SET ESTADO = '" + req.body.estado + "' WHERE ID_PROTOCOLO = " + req.body.id_protocolo;
    console.log(sql);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }   
    });
    res.write('<p>Estado atualizado com sucesso!</p><a href="/">Voltar</a>');
    db.close(); // Fecha o banco
    res.end();
});



/****************************** DELETAR DADOS DO PROTOCOLO ********************************************/
// CRUD-DELETE

//  DELETAR PROTOCOLOS 
app.delete('/apagar_protocolo', (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
    let sql = "DELETE  from Protocolo  WHERE ID_PROTOCOLO =" + req.body.id_protocolo;
    console.log(sql);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }   
    });
    res.write('<p>Protocolo apagado com sucesso!</p><a href="/">Voltar</a>');
    db.close(); // Fecha o banco
    res.end();
});


