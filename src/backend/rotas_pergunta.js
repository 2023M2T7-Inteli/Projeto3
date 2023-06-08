// NÃO UTILIZADO ATÉ O MOMENTO 

//  Criar nova pergunta - Letra C no CRUD 
app.post('/protocolo_perguntas', urlencodedParser, (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
	const questoes = req.body.questoes.map(obj => obj.questao);
	for (const questao of questoes) {
		sql = `INSERT INTO Pergunta (pergunta, id_protocolo) VALUES ('${questao}', ${req.body.id_protocolo})`;
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

//  DELETAR CONTA DE UM USUÁRIO - LETRA D NO CRUD
app.get('/remove_pergunta', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM Pergunta WHERE ID_PERGUNTA='" + req.query.id_pergunta + "'";
	console.log(sql);
	var db = new sqlite3.Database(PATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>PERGUNTA REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});
