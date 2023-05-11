const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const PATH = "../database/db_obyweb.db";

const app = express();
app.listen(3000)

app.use(express.static("../frontend/"));
app.use(express.json())


/////////////////////// TABELA PROTOCOLO

//  Criar novo protocolo - Letra C no CRUD 
app.post('/novo_protocolo', urlencodedParser, (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
	sql = "INSERT INTO Protocolo (nome, descricao, data_limite, estado) VALUES ('" + req.body.nome + "', '" + req.body.descricao + "', '" + req.body.data_limite + "', '" + req.body.estado + "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
			throw err;
		}

	});
	res.write('<p>GRUPO CRIADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
})



/////////////////////// TABELA PERGUNTA

//  Criar nova pergunta - Letra C no CRUD 
app.post('/protocolo_perguntas', urlencodedParser, (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
	const questoes = req.body.questoes.map(obj => obj.questao);
	for (const questao of questoes) {
		sql = `INSERT INTO Pergunta (pergunta, id_protocolo) VALUES ('${questao}', ${req.query.id_protocolo})`;
		console.log(sql)		
		db.run(sql, function (err) {
			if (err) {
				throw err;
			}
		});
	}
	res.write('<p>GRUPO CRIADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
})