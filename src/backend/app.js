var express = require("express");
var app = express();
var port = process.env.PORT || 1234;
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const path = require("path");

const sqlite3 = require("sqlite3").verbose();
const PATH = "../database/db_obyweb2.db";
var id;

app.use(express.static("../frontend/"));
app.use(express.json());

// Quando entrar, redireciona para a tela de login
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/home-pesquisador", (req, res) => {
  const filePath = "/home-pesquisador";
  res.sendFile(filePath, { root: "../frontend" });
});

// app.get("/responder-protocolo", (req, res) => {                   //tentar fazer funcionar
//   const filePath = "/responderprotocolo/index.html";
//   res.sendFile(filePath, { root: "../frontend" });
// });

//  Inserir novo Usuario na tabela - Letra C no CRUD
app.post("/cadastrado_Usuario", urlencodedParser, (req, res) => {
  var db = new sqlite3.Database(PATH); // Abre o banco
  sql =
    "INSERT INTO Usuario (nome, email, senha, telefone) VALUES ('" +
    req.body.nome +
    "', '" +
    req.body.email +
    "', '" +
    req.body.senha +
    "', '" +
    req.body.telefone +
    "')";
  console.log(sql);
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
  });
  res.write('<p>USUARIO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
  db.close(); // Fecha o banco
  res.end();
});

//  Visualização de todos os Usuarioes - Letra R no CRUD
app.get("/Usuario", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(PATH); // Abre o banco
  var sql = "SELECT * FROM Usuario  ORDER BY Usuario.nome COLLATE NOCASE;";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

//  Sistema de login - Letra R no CRUD
app.post("/login_Usuario", (req, res) => {
  const db = new sqlite3.Database(PATH);

  var sql = `SELECT * FROM Usuario WHERE EMAIL = ? AND SENHA = ?`;

  db.get(sql, [req.body.email, req.body.senha], (err, row) => {
    if (err) {
      throw err;
    }

    if (row) {
      const usuario = row.TIPO_USUARIO;

      if (usuario === "Pesquisador") {
        res.json({ souPesquisador: true });
      } else if (usuario === "Coletor") {
        res.json({ souColetor: true });
      } else {
        res.json({ message: "Tipo de usuário inválido." });
      }
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  });

  db.close();
});

//  Select na informação de usuário específico - Letra U no CRUD
app.get("/atualizar_Usuario", (req, res) => {
  var db = new sqlite3.Database(PATH); // Abre o banco
  var sql = "SELECT * FROM Usuario WHERE ID_Usuario=" + req.query.id_Usuario;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

//  Alteração na informação de usuário específico - Letra U no CRUD
app.post("/atualizar_Usuario/atualizado", (req, res) => {
  var db = new sqlite3.Database(PATH); // Abre o banco
  var sql =
    'UPDATE Usuario SET nome = "' +
    req.body.nome +
    '", email ="' +
    req.body.email +
    '", senha="' +
    req.body.senha +
    '",  telefone= "' +
    req.body.telefone + 
    '" WHERE ID_Usuario=' +
    req.body.id_Usuario;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

//  DELETAR CONTA DE UM USUÁRIO - LETRA D NO CRUD
app.get("/remove_Usuario", urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  sql = "DELETE FROM Usuario WHERE ID_Usuario='" + req.query.id_Usuario + "'";
  console.log(sql);
  var db = new sqlite3.Database(PATH); // Abre o banco
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
    res.write('<p>USUARIO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
    res.end();
  });
  db.close(); // Fecha o banco
});

//  DELETAR CONTA DE UM USUÁRIO - LETRA D NO CRUD
app.get("/remove_protocolo", urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  sql = "DELETE FROM Protocolo WHERE ID_PROTOCOLO = ? ";
  console.log(sql);
  var db = new sqlite3.Database(PATH); // Abre o banco
  db.run(sql, [req.query.id], (err) => {
    if (err) {
      throw err;
    }
    res.end();
  });
  db.close(); // Fecha o banco
});

app.post("/criar_protocolo", (req, res) => {
  var db = new sqlite3.Database(PATH); // Open the database
  var sql =
    "INSERT INTO Protocolo (nome, descricao, data_limite, estado) VALUES (?, ?, ?, ?)";
  console.log(req.body);
  var values = [
    req.body[0].nome,
    req.body[0].descricao,
    req.body[0].data_limite,
    req.body[0].estado,
  ];
  console.log(values);

  db.run(sql, values, function (err) {
    if (err) {
      throw err;
    }
    var protocolo_ID = this.lastID;

    var perguntas = req.body.slice(1, req.body.length - 1); // Remove o primeiro e último elemento (dados do protocolo e imagens)

    var imagens = req.body[req.body.length - 1]; // Último elemento contém as imagens

    perguntas.forEach((pergunta) => {
      sql =
        "INSERT INTO Pergunta (pergunta, tipo_input, id_protocolo) VALUES (?, ?, ?)";
      values = [pergunta.pergunta, pergunta.tipo_resposta, protocolo_ID];
      console.log(values);

      db.run(sql, values, function (err) {
        if (err) {
          throw err;
        }
        var pergunta_ID = this.lastID;

        if (
          pergunta.tipo_resposta === "select" &&
          pergunta.alternativas &&
          pergunta.alternativas.length > 0
        ) {
          pergunta.alternativas.forEach((alternativa) => {
            sql =
              "INSERT INTO Alternativa (Alternativa, ID_PERGUNTA) VALUES (?, ?)";
            values = [alternativa, pergunta_ID];
            console.log(values);

            db.run(sql, values, function (err) {
              if (err) {
                throw err;
              }
            });
          });
        }
      });
    });

    imagens.forEach((imagem) => {
      sql =
        "INSERT INTO Requisicao_imagem (pergunta, id_protocolo) VALUES (?, ?)";
      values = [imagem.imagem, protocolo_ID];
      console.log(values);

      db.run(sql, values, function (err) {
        if (err) {
          throw err;
        }
      });
    });

    db.close(); // Close the database connection
  });
  res.end();
});

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

app.get("/pesquisar_protocolos", (req, res) => {
  var db = new sqlite3.Database(PATH); // Abre o banco
  let sql = "SELECT * FROM PROTOCOLO WHERE ID_PROTOCOLO = ? OR NOME = ?";
  console.log(sql);
  db.all(sql, [req.query.input, req.query.input], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
    console.log(rows);
  });
  db.close(); // Fecha o banco
});
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var id;
app.get("/responderprotocolo/:id", (req, res) => {
  id = req.params.id;
  // Envie o arquivo index.html como resposta
  const responderProtocoloDir = path.join(
    __dirname,
    "..",
    "frontend",
    "responderprotocolo"
  );
  res.sendFile(path.join(responderProtocoloDir, "index.html"));
  // Envie o arquivo index.html como resposta
});

app.get("/visualizar_protocolo/:id", (req, res) => {
  id = req.params.id;
  // Envie o arquivo index.html como resposta
  const responderProtocoloDir = path.join(
    __dirname,
    "..",
    "frontend",
    "visualizar_protocolo"
  );
  res.sendFile(path.join(responderProtocoloDir, "index.html"));
  // Envie o arquivo index.html como resposta
});

//responderProtocolo
app.get("/visualizar_perguntas/:id", (req, res) => {
  console.log("rota");
  var db = new sqlite3.Database(PATH); // Abre o banco
  let sql = "SELECT * FROM Pergunta WHERE ID_PROTOCOLO = " + req.params.id;
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(sql);
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
    console.log(rows);
  });
  db.close(); // Fecha o banco
});

app.get("/visualizar_responder_protocolo/:id", (req, res) => {
  var db = new sqlite3.Database(PATH); // Abre o banco
  let sql = "SELECT * FROM Pergunta WHERE ID_PROTOCOLO =" + req.params.id;
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(sql);
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

app.post("/responder_protocolo", (req, res) => {
  //endpoint que manda o conteúdo de 'valor' e 'id_pergunta' para o banco de dados
  var db = new sqlite3.Database(PATH); // Abre o banco
  var id_pergunta = req.body.id_pergunta;
  var valor = req.body.valor;
  let sql = `INSERT INTO Resposta (ID_PERGUNTA, RESPOSTA) VALUES ("${id_pergunta}", "${valor}")`;
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(sql);
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
