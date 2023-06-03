import { Router } from "express";
const alternativas = Router();

//  Criar nova Alternativa - Letra C no CRUD 
alternativas.post('/pergunta_alternativas', urlencodedParser, (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
	const questoes = req.body.questoes.map(obj => obj.questao);
	for (const questao of questoes) {
		sql = `INSERT INTO Alternativa (Alternativa, id_pergunta) VALUES ('${questao}', ${req.body.id_protocolo})`;
		console.log(sql)		
		db.run(sql, function (err) {
			if (err) {
				throw err;
			}
		});
	}
	res.write('<p>alternativas adicionadas!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
})

//  DELETAR CONTA DE UM USUÁRIO - LETRA D NO CRUD
alternativas.get('/remove_Alternativa', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM Alternativa WHERE ID_Alternativa='" + req.query.id_Alternativa + "'";
	console.log(sql);
	var db = new sqlite3.Database(PATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>Alternativa REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});


//  DELETAR CONTA DE UM USUÁRIO - LETRA D NO CRUD
alternativas.get('/remove_Alternativa', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM Alternativa WHERE ID_Alternativa='" + req.query.id_Alternativa + "'";
	console.log(sql);
	var db = new sqlite3.Database(PATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>Alternativa REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});

export default alternativas;