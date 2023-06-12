var express = require("express");
var app = express();
var port = process.env.PORT || 1234;
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const PATH = "../database/db_obyweb2.db";

app.use(express.static("../frontend/"));
app.use(express.json())


// Quando entrar, redireciona para a tela de login
app.get('/', (req, res) => {
  res.redirect('/login');
});

//  Inserir novo Usuario na tabela - Letra C no CRUD 
app.post('/cadastrado_Usuario', urlencodedParser, (req, res) => {
	var db = new sqlite3.Database(PATH); // Abre o banco
	sql = "INSERT INTO Usuario (nome, email, senha, telefone) VALUES ('" + req.body.nome + "', '" + req.body.email + "', '" + req.body.senha + "', '" + req.body.telefone + "')";
	console.log(sql);
	db.run(sql, [], err => {
		if (err) {
			throw err;
		}
	});
	res.write('<p>USUARIO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
})

//  Visualização de todos os Usuarioes - Letra R no CRUD 
app.get('/Usuario', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(PATH); // Abre o banco
	var sql = 'SELECT * FROM Usuario \ ORDER BY Usuario.nome COLLATE NOCASE;';
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
})

//  Sistema de login - Letra R no CRUD 
app.post('/login_Usuario', (req, res) => {
	const db = new sqlite3.Database(PATH);
  
	const sql = `SELECT * FROM Usuario WHERE EMAIL = ? AND SENHA = ?`;
  
	db.get(sql, [req.body.email, req.body.senha], (err, row) => {
	  if (err) {
		throw err;
	  }
  
	  if (row) {
		const usuario = row.TIPO_USUARIO;
  
		if (usuario === 'Pesquisador') {
		  res.json({ souPesquisador: true });
		} else if (usuario === 'Coletor') {
		  res.json({ souColetor: true });
		} else {
		  res.json({ message: 'Tipo de usuário inválido.' });
		}
	  } else {
		res.status(404).json({ message: 'Usuário não encontrado.' });
	  }
	});
  
	db.close();
  });
  


//  Select na informação de usuário específico - Letra U no CRUD
app.get('/atualizar_Usuario', (req, res) => {
	var db = new sqlite3.Database(PATH); // Abre o banco
	var sql = 'SELECT * FROM Usuario WHERE ID_Usuario=' + req.query.id_Usuario;
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
})

//  Alteração na informação de usuário específico - Letra U no CRUD
app.post('/atualizar_Usuario/atualizado', (req, res) => {
	var db = new sqlite3.Database(PATH); // Abre o banco
	var sql = 'UPDATE Usuario SET nome = "' + req.body.nome + '", email ="' + req.body.email + '", senha="' + req.body.senha + '",  telefone= "' + req.body.telefone + '" WHERE ID_Usuario=' + req.body.id_Usuario;
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
})

//  DELETAR CONTA DE UM USUÁRIO - LETRA D NO CRUD
app.get('/remove_Usuario', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	sql = "DELETE FROM Usuario WHERE ID_Usuario='" + req.query.id_Usuario + "'";
	console.log(sql);
	var db = new sqlite3.Database(PATH); // Abre o banco
	db.run(sql, [], err => {
		if (err) {
			throw err;
		}
		res.write('<p>USUARIO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
})


app.post('/criar_protocolo', (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
	sql = "INSERT INTO Protocolo (nome, descricao, data_limite, estado) VALUES ('" + req.body.nome + "', '" + req.body.descricao + "', '" + req.body.data_limite + "', '" + req.body.estado + "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>Protocolo criado com sucesso!</p><a href="/">Voltar</a>');
	db.close(); // Fecha o banco
	res.end();
})


// ***********************************************************************
app.get("/visualizar_protocolos", (req, res) => {
  var db = new sqlite3.Database(PATH); // Abre o banco
  let sql = "SELECT * FROM PROTOCOLO";
  console.log(sql);
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//responderProtocolo
app.get("/responder_protocolo", (req, res) => {
  var db = new sqlite3.Database(PATH); // Abre o banco
  let sql = "SELECT * FROM PERGUNTAS";
  console.log(sql);
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});