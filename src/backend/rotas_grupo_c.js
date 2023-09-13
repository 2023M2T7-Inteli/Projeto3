// NÃO UTILIZADO ATÉ O MOMENTO 

//  Inserir novo grupo - Letra C no CRUD 
app.post('/novo_grupo', urlencodedParser, (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
	sql = "INSERT INTO Grupo_C (nome) VALUES ('" + req.body.nome + "')";
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

//  Visualização de todos os grupos - Letra R no CRUD 
app.get('/grupos', (req,res) => {
    var db = new sqlite3.Database(PATH); // Abre o banco
    var sql = 'SELECT Grupo_C.* , Coletor.NOME AS NOME_COLETOR \ FROM Grupo_C \ INNER JOIN Coletor ON Coletor.ID_GRUPO = Grupo_C.ID_GRUPO \ ORDER BY Grupo_C.ID_GRUPO COLLATE NOCASE;';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
})

//  Visualização de grupo específico para atualização - Letra U no CRUD 
app.get('/atualizar_grupo', (req,res) => {
    var db = new sqlite3.Database(PATH); // Abre o banco
    var sql = 'SELECT Grupo_C.* , Coletor.NOME AS NOME_COLETOR \ FROM Grupo_C \ INNER JOIN Coletor ON Coletor.ID_GRUPO = Grupo_C.ID_GRUPO \ WHERE Grupo_C.ID_GRUPO =' + req.query.id_grupo;
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
})

//  Alteração de grupo específico - Letra U no CRUD 
app.post('/atualizar_grupo/atualizado', (req,res) => {
    var db = new sqlite3.Database(PATH); // Abre o banco
	const ids = req.body.coletor.map(obj => parseInt(obj.id_coletor));
 	var sql = 'UPDATE Grupo_C SET nome = "' + req.body.nome + '" WHERE ID_GRUPO=' + req.body.id_grupo + `; \ UPDATE Coletor SET ID_GRUPO = ${req.query.id_grupo} WHERE ID_COLETOR IN(${ids.join()})`
	console.log(sql)
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
})

//  Deletar grupo - LETRA D NO CRUD
app.get('/remove_grupo', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM Grupo_C WHERE ID_GRUPO='" + req.query.id_grupo + "'";
	console.log(sql);
	var db = new sqlite3.Database(PATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>GRUPO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});