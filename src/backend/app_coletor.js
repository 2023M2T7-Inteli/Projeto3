const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const PATH = "../database/db_obyweb.db";

const app = express();
app.listen(3000)

app.use(express.static("../frontend/"));
app.use(express.json())



//  Inserir novo coletor na tabela - Letra C no CRUD 
app.post('/cadastrado_coletor', urlencodedParser, (req,res)=> {
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

//  Visualização de todos os coletores - Letra R no CRUD 
app.get('/coletores', (req,res) => {
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

//  Sistema de login - Letra R no CRUD 
app.post('/login_coletor', (req,res) => {
    var db = new sqlite3.Database(PATH); // Abre o banco
	var sql = 'SELECT * FROM Coletor WHERE EMAIL= "'  + req.body.email + '" AND SENHA= "' + req.body.senha  + '"';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		if (rows.length > 0) {
            res.json({ message: 'Logado com sucesso.' });
        } else {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
	});
	db.close(); // Fecha o banco
})

//  Select na informação de usuário específico - Letra U no CRUD
app.get('/atualizar_coletor', (req,res) => {
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

//  Alteração na informação de usuário específico - Letra U no CRUD
app.post('/atualizar_coletor/atualizado', (req,res) => {
    var db = new sqlite3.Database(PATH); // Abre o banco
    var sql = 'UPDATE Coletor SET nome = "' + req.body.nome + '", email ="' + req.body.email + '", senha="' + req.body.senha + '",  telefone= "' + req.body.telefone + '" WHERE ID_COLETOR=' + req.body.id_coletor;
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
})

//  DELETAR CONTA DE UM USUÁRIO - LETRA D NO CRUD
app.get('/remove_coletor', urlencodedParser, (req, res) => {
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