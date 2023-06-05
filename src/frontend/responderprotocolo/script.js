var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const PATH = "../database/db_obyweb.db";

app.use(express.static("../frontend/"));
app.use(express.json())

app.post('/responderprotocolo', urlencodedParser, (req,res)=> {
    var db = new sqlite3.Database(PATH); // Abre o banco
	sql = "SELECT * FROM Pergunta"
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>foi</p>');
	db.close(); // Fecha o banco
	res.end();
})

