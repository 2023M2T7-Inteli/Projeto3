const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const PATH = "../database/db_obyweb.db";

const app = express();
app.listen(3000)

app.use(express.static("../frontend/"));
app.use(express.json())


//  Inserir novo usuário na tabela "PESQUISADOR" - Letra C no CRUD 
app.post('/cadastrado_pesquisador', urlencodedParser, (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
	sql = "INSERT INTO Pesquisador (nome, email, senha) VALUES ('" + req.body.nome + "', '" + req.body.email + "', '" + req.body.senha + "')";
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

//  Visualização de todos os pesquisadores - Letra R no CRUD 
app.get('/pesquisadores', (req,res) => {
    var db = new sqlite3.Database(PATH); // Abre o banco
    var sql = 'SELECT * FROM Pesquisador \ ORDER BY Pesquisador.nome COLLATE NOCASE;';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
})

//  Sistema de login - Letra R no CRUD 
app.post('/login_pesquisador', (req,res) => {
    var db = new sqlite3.Database(PATH); // Abre o banco
	var sql = 'SELECT * FROM Pesquisador WHERE EMAIL= "'  + req.body.email + '" AND SENHA= "' + req.body.senha  + '"';
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
app.get('/atualizar_pesquisador', (req,res) => {
    var db = new sqlite3.Database(PATH); // Abre o banco
    var sql = 'SELECT * FROM Pesquisador WHERE ID_PESQUISADOR=' + req.query.id_pesquisador;
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
})

//  Alteração na informação de usuário específico - Letra U no CRUD
app.post('/atualizar_pesquisador/atualizado', (req,res) => {
    var db = new sqlite3.Database(PATH); // Abre o banco
    var sql = 'UPDATE Pesquisador SET nome = "' + req.body.nome + '", email ="' + req.body.email + '", senha="' + req.body.senha + '" WHERE ID_PESQUISADOR=' + req.query.id_pesquisador;
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
})

//  Deletar conta de um usuário - Letra D no CRUD
app.get('/remove_pesquisador', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM Pesquisador WHERE ID_PESQUISADOR='" + req.query.id_pesquisador + "'";
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