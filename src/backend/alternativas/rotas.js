import { Router } from "express";
import sqlite3 from "sqlite3";
const alternativas = Router();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended:false})

//  Criar nova Alternativa - Letra C no CRUD 
alternativas.post('/alternativas_perguntas', urlencodedParser, (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
	const alternativas = req.body.questoes.map(obj => obj.questao);
	for (const alternativa of alternativas) {
		sql = `INSERT INTO Alternativa (alternativa, id_pergunta) VALUES ('${alternativa}', ${req.body.id_pergunta})`;
		console.log(sql)		
		db.run(sql, function (err) {
			if (err) {
				throw err;
			}
		});
	}
	res.write('<p>Perguntas adicionadas!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
})

