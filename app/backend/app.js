<<<<<<< Updated upstream:app/backend/app.js
<<<<<<<< Updated upstream:app/backend/app.js
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
========
import { Router } from "express";
const coletorRouter = Router();

coletorRouter.post('/cadastrado_coletor', urlencodedParser, (req,res)=> {
>>>>>>>> Stashed changes:app/backend/coletor/rotas.js
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

<<<<<<<< Updated upstream:app/backend/app.js
//  VISUALIZAÇÃO DE TODOS OS USUÁRIOS DA TABELA "COLETOR" - LETRA R NO CRUD 
app.get('/usuarios', (req,res) => {
========
//  Visualização de todos os coletores - Letra R no CRUD 
coletorRouter.get('/coletores', (req,res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
>>>>>>>> Stashed changes:app/backend/coletor/rotas.js
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

<<<<<<<< Updated upstream:app/backend/app.js
//  SELECT NAS INFORMAÇÕES DE USUÁRIO ESPECÍFICO - LETRA U NO CRUD
app.get('/atualizar_usuario', (req,res) => {
========
//  Sistema de login - Letra R no CRUD 
coletorRouter.post('/login_coletor', (req,res) => {
    var db = new sqlite3.Database(PATH); 
	console.log(req.body);// Abre o banco
	var sql = 'SELECT * FROM Coletor WHERE EMAIL= "'  + req.body.email + '" AND SENHA= "' + req.body.senha  + '"';
	console.log(sql)
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		if (rows.length > 0) {
            return res.json({ message: 'Logado com sucesso.' });
			
        } else {
            return res.status(500).json({ message: 'Usuário não encontrado.' });
        }
	});
	db.close(); // Fecha o banco
})

//  Select na informação de usuário específico - Letra U no CRUD
coletorRouter.get('/atualizar_coletor', (req,res) => {
>>>>>>>> Stashed changes:app/backend/coletor/rotas.js
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

<<<<<<<< Updated upstream:app/backend/app.js
//  ALTERAÇÃO NAS INFORMAÇÕES DE USUÁRIO ESPECÍFICO - LETRA U NO CRUD
app.post('/atualizar_usuario/atualizado', (req,res) => {
========
//  Alteração na informação de usuário específico - Letra U no CRUD
coletorRouter.post('/atualizar_coletor/atualizado', (req,res) => {
>>>>>>>> Stashed changes:app/backend/coletor/rotas.js
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

<<<<<<<< Updated upstream:app/backend/app.js
//  ALTERAÇÃO NAS INFORMAÇÕES DE USUÁRIO ESPECÍFICO - LETRA U NO CRUD
app.get('/remove_usuario', (req, res) => {
========
//  DELETAR CONTA DE UM USUÁRIO - LETRA D NO CRUD
coletorRouter.get('/remove_coletor', urlencodedParser, (req, res) => {
>>>>>>>> Stashed changes:app/backend/coletor/rotas.js
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

<<<<<<<< Updated upstream:app/backend/app.js







 
=======
import express from "express";
import routes from "./routes.js";
const hostname = "localhost";
const port = 3000;
const app = express();
/* Colocar toda a parte estática no frontend */
app.use(express.static("../frontend/"));
/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* Aplica as rotas */
app.use(routes);
/* Inicia o servidor */
app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});

>>>>>>> Stashed changes:src/backend/app.js











<<<<<<< Updated upstream:app/backend/app.js
========
export default coletorRouter;
>>>>>>>> Stashed changes:app/backend/coletor/rotas.js
=======




>>>>>>> Stashed changes:src/backend/app.js
