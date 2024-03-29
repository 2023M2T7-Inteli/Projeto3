import { Route, Router } from "express";
const protocolo = Router();

/****************************** CRIAR PROTOCOLO ********************************************/

protocolo.post('/criar_protocolo', (req,res)=> {
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

/****************************** VISUALIZAR PROTOCOLOS ********************************************/

//  SELECT GERAL - LETRA R NO CRUD
protocolo.get('/visualizar_protocolos', (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
    let sql = "SELECT * FROM PROTOCOLO";
    console.log(sql);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

/****************************** ATUALIZAR DADOS DO PROTOCOLO ************************************/

//  SELECT EM USUÁRIO ESPECÍFICO - LETRA U NO CRUD
protocolo.get('/atualizar_protocolo', (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
    var sql = 'SELECT Protocolo.*, Pergunta.Pergunta \ FROM Protocolo \ INNER JOIN Pergunta ON Pergunta.ID_PROTOCOLO = Protocolo.ID_PROTOCOLO \ WHERE Protocolo.ID_PROTOCOLO =' + req.query.id_protocolo;
    console.log(sql);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }   
        res.json(rows);
    });
    db.close(); // Fecha o banco
});


//  ATUALIZA OS CAMPOS NA TABELA "PROTOCOLO" - LETRA U NO CRUD
protocolo.post('/atualizar_protocolo/atualizado', (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
    let sql = "UPDATE Protocolo SET NOME='" + req.body.nome + "', DESCRICAO = '" + req.body.descricao + "', DATA_LIMITE = '" + req.body.data_limite + "', ESTADO = '" + req.body.estado + "' WHERE ID_PROTOCOLO = " + req.body.id_protocolo;
    console.log(sql);
    db.all(sql, [],  err => {
        if (err) {
            throw err;
        }   
    });
    res.write('<p>Campo atualizado com sucesso!</p><a href="/">Voltar</a>');
    db.close(); // Fecha o banco
    res.end();
});



/****************************** DELETAR DADOS DO PROTOCOLO *****************************************/

//  DELETAR PROTOCOLOS 
protocolo.get('/apagar_protocolo', (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
    let sql = "DELETE  from Protocolo  WHERE ID_PROTOCOLO =" + req.query.id_protocolo;
    console.log(sql);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }   
    });
    res.write('<p>Protocolo apagado com sucesso!</p><a href="/">Voltar</a>');
    db.close(); // Fecha o banco
    res.end();
});

export default protocolo;