const express = require('express');
const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose();
const PATH = "../database/db_obyweb.db";

const app = express();
app.listen(3000)

app.use(express.static("../frontend/"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//  INSERIR NOVO USUÁRIO NA TABELA "COLETOR" - LETRA C NO CRUD 
app.post('/cadastrado', (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
	sql = "INSERT INTO Coletor (nome, email, senha, telefone) VALUES ('" + req.body.nome + "', '" + req.body.email + "', '" + req.body.senha + "', '" + req.body.telefone + "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>USUARIO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
})

//  VISUALIZAÇÃO DE TODOS OS USUÁRIOS DA TABELA "COLETOR" - LETRA R NO CRUD 
app.get('/usuarios', (req,res) => {
    var db = new sqlite3.Database(PATH); // Abre o banco
    var sql = 'SELECT * FROM Coletor \ ORDER BY Coletor.nome COLLATE NOCASE;';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
})

//  SELECT NAS INFORMAÇÕES DE USUÁRIO ESPECÍFICO - LETRA U NO CRUD
app.get('/atualizar_usuario', (req,res) => {
    var db = new sqlite3.Database(PATH); // Abre o banco
    var sql = 'SELECT * FROM Coletor WHERE ID_COLETOR=' + req.query.id_coletor;
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
})

//  ALTERAÇÃO NAS INFORMAÇÕES DE USUÁRIO ESPECÍFICO - LETRA U NO CRUD
app.post('/atualizar_usuario/atualizado', (req,res) => {
    var db = new sqlite3.Database(PATH); // Abre o banco
    var sql = 'UPDATE Coletor SET nome = "' + req.body.nome + '", email ="' + req.body.email + '", senha="' + req.body.senha + '",  telefone= "' + req.body.telefone + '" WHERE ID_COLETOR=' + req.query.id_coletor;
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
})

//  ALTERAÇÃO NAS INFORMAÇÕES DE USUÁRIO ESPECÍFICO - LETRA U NO CRUD
app.get('/remove_usuario', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM Coletor WHERE ID_COLETOR='" + req.query.id_coletor + "'";
	console.log(sql);
	var db = new sqlite3.Database(PATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>USUARIO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});








 











