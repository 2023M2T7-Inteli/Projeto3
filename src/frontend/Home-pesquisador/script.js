
//////////////////// ABRE CARDS/////////////////
function abreProtocolo(id_protocolo) {
  // Cria um objeto com os dados do usuário
  console.log(id_protocolo)
  var data = {
    "id_protocolo": id_protocolo
  };
  const url = 'visualizar_protocolos_pesquisador/' + `${id_protocolo}`; // Define a URL da rota do backend
  // Envia uma requisição POST para o backend com os dados do usuário
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    // Verifica se a resposta da requisição foi bem-sucedida
    if (response.ok) {
      window.location.href = '/responderprotocolo/' + `${id_protocolo}`;
      // Analisa a resposta JSON
      response.json()
      console
    } else {
      // Exibe uma mensagem de erro caso a requisição tenha falhado
      console.log("Erro na requisição:", response.status);
    }
  });
};

/////////////////////MOSTRA CARDS NA HOME//////////////////
const on_load_pesquisador = () => {
  // Realiza uma solicitação GET para obter os protocolos
  axios
    .get("http://localhost:1234/visualizar_protocolos/")
    .then((response) => {
      // Obtém os dados da resposta
      const protocolos = response.data;

      console.log(protocolos);
      let array_html_abertas = [];
      let array_html_enviadas = [];

      // Itera sobre cada protocolo
      protocolos.forEach((protocolo) => {
        const { id_protocolo, nome, descricao, data_limite, estado } = protocolo;

        let html = "";

        // Gera o trecho de código HTML para cada protocolo
        html += `<div class="card" onclick="redirecionaHomeColetor(${protocolo.ID_PROTOCOLO})">
        <img src="img-protocolo.svg"  class="h-75" alt="Semente de Karité, protocolo 1" class="img-protocol">
    <div class="card-content">
        <div id="content">
        <p class="card-title"><strong>${protocolo.NOME}</strong></p>
        <p class="card-date">${protocolo.DATA_LIMITE}</p>
        <p class="card-id"><strong>ID: ${protocolo.ID_PROTOCOLO}</strong></p>
        </div>
        <div id="icon">
        <i class="bi bi-trash" onclick="openModal(${protocolo.ID_PROTOCOLO})"></i>
        </div>
    </div>
    </div>`;

        if (protocolo.ESTADO === "Em aberto") {
          // Adiciona o trecho HTML à array de protocolos em aberto
          array_html_abertas.push(html);
        } else {
          // Adiciona o trecho HTML à array de protocolos enviados
          array_html_enviadas.push(html);
        }
      });

      const cardEnviados = document.getElementById("cardEnviados");
      const cardRecebidos = document.getElementById("cardRecebidos");

      // Insere o código HTML dos protocolos em aberto na div 'cardEnviados'
      array_html_abertas.forEach((trecho_html) => {
        cardEnviados.innerHTML += trecho_html;
      });
      // Insere o código HTML dos protocolos enviados na div 'cardRecebidos'
      array_html_enviadas.forEach((trecho_html) => {
        cardRecebidos.innerHTML += trecho_html;
      });
    })
    .catch((error) => {
      // Exibe qualquer erro no console
      console.log(error);
    });
};



////////////FILTRA OS CARDS////////////////////////
function filtrar(){
  // Obtém o valor do input de pesquisa
  var input_pesquisa = document.getElementById('input-pesquisa').value;
  console.log(input_pesquisa)

  // Cria um objeto com o valor do input
  var data = {
    input: input_pesquisa
  };

  // Converte o objeto em uma string JSON
  data = JSON.stringify(data)

  // Faz uma solicitação GET para pesquisar protocolos com o valor de pesquisa fornecido
  axios
    .get("http://localhost:1234/pesquisar_protocolos", {
      params: {
        input: input_pesquisa
      }
    })

    .then((response) => {
      // Obtém os dados dos protocolos retornados na resposta
      const protocolos = response.data;

      console.log(protocolos);
      let array_html_abertas = [];
      let array_html_enviadas = [];

      // Remove todos os cartões existentes no DOM
      var cards = document.getElementsByClassName('card');
      while (cards.length > 0) {
        cards[0].remove();
      }

      // Itera sobre cada protocolo retornado
      protocolos.forEach((protocolo) => {
        const { id_protocolo, nome, descricao, data_limite, estado } = protocolo;

        let html = "";

        // Gera o trecho de código HTML para cada protocolo
        html += `<div class="card" onclick="redirecionaHomeColetor(${protocolo.ID_PROTOCOLO})">
        <img src="img-protocolo.svg"  class="h-75" alt="Semente de Karité, protocolo 1" class="img-protocol">
    <div class="card-content">
        <div id="content">
        <p class="card-title"><strong>${protocolo.NOME}</strong></p>
        <p class="card-date">${protocolo.DATA_LIMITE}</p>
        <p class="card-id"><strong>ID: ${protocolo.ID_PROTOCOLO}</strong></p>
        </div>
        <div id="icon">
        <i class="bi bi-trash" onclick="openModal(${protocolo.ID_PROTOCOLO})"></i>
        </div>
    </div>
    </div>`;

        if (protocolo.ESTADO === "Em aberto") {
          // Adiciona o trecho HTML à array de protocolos em aberto
          array_html_abertas.push(html);
        } else {
          // Adiciona o trecho HTML à array de protocolos enviados
          array_html_enviadas.push(html);
        }
      });

      const cardEnviados = document.getElementById("cardEnviados");
      const cardRecebidos = document.getElementById("cardRecebidos");

      // Insere o código HTML dos protocolos em aberto na div 'cardEnviados'
      array_html_abertas.forEach((trecho_html) => {
        cardEnviados.innerHTML += trecho_html;
      });
      // Insere o código HTML dos protocolos enviados na div 'cardRecebidos'
      array_html_enviadas.forEach((trecho_html) => {
        cardRecebidos.innerHTML += trecho_html;
      });
    })
    .catch((error) => {
      // Exibe qualquer erro no console
      console.log(error);
    });
}


///////////////ABRE E FECHA MODALS//////////////////
// Função para abrir o modal e exibir um ID específico
function openModal(id) {
  // Define o estilo de exibição do modal como "block" para torná-lo visível
  document.getElementById("myModal").style.display = "block";
  // Define o valor do campo oculto "id_hidden" como o ID fornecido
  document.getElementById("id_hidden").value = id;
}

// Função para fechar o modal
function closeModal() {
  // Define o estilo de exibição do modal como "none" para ocultá-lo
  document.getElementById("myModal").style.display = "none";
}


//////////////DELETA PROTOCOLOS///////////////////////////
function deleteForm(id){

  axios
    .get("http://localhost:1234/remove_protocolo",  {
      params: {
        id: id
      }
    })
    .catch((error) => {
      console.log(error);
    });

  closeModal();
  setTimeout(function(){
    window.location.href = '/Home-pesquisador'
}, 2000);
}

function redirecionaHomeColetor(id_protocolo) {
  // Cria um objeto com os dados do usuário
  console.log(id_protocolo)
  var data = {
    "id_protocolo": id_protocolo
  };
  const url = '/visualizar_protocolo/' + `${id_protocolo}`; // Define a URL da rota do backend
  // Envia uma requisição POST para o backend com os dados do usuário
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    // Verifica se a resposta da requisição foi bem-sucedida
    if (response.ok) {
      window.location.href = '/visualizar_protocolo/' + `${id_protocolo}`;
      // Analisa a resposta JSON
      response.json()
      console
    } else {
      // Exibe uma mensagem de erro caso a requisição tenha falhado
      console.log("Erro na requisição:", response.status);
    }
  });
};

////////////////SCROLL/////////////////////////////////////////
const coluna = document.getElementsByClassName('column');

coluna.addEventListener('scroll', function () {
  const scrollPosition = kanban.scrollLeft;
  
});




////////////////////////SCRIPT-PESQUISADOR////////////////////////////


// Importação das dependências
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

// Criação da instância do aplicativo Express
const app = express();
const port = 3000;

// Função para carregar protocolos já existentes
// A função é chamada quando a página é carregada
function load_question() {
  document
    .getElementById("login-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o envio do formulário

      // Obtém os valores dos campos de entrada
      var email = document.getElementById("email").value;
      var senha = document.getElementById("senha").value;
      var papel = document.querySelector('input[name="papel"]:checked').value;
      var data = {
        email: email,
        senha: senha,
      };

      const url = "/protocolos_enviados"; // Rota para enviar os dados do formulário
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((response) => {
          let login = response;
          console.log("mauro");
          if (login.message == "Logado com sucesso.") {
            if (papel == "coletor") {
              // Redireciona para a página inicial do coletor
              window.location.pathname = "../home-coletor/homecoletor.html";
              console.log(data);
            } else if (papel == "pesquisador") {
              // Redireciona para a página inicial do pesquisador
              window.location.pathname =
                "../Home-pesquisador/home-pesquisador.html";
              console.log(data);
            }
          } else {
            console.log(response);
          }
        });
    });
}

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database("../database/db_obyweb.db");

// Rota para retornar os protocolos enviados
app.get("/protocolos-enviados", (req, res) => {
  db.all("SELECT * FROM protocolos_enviados", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao consultar o banco de dados.");
    } else {
      res.json(rows);
    }
  });
});

// Rota para retornar os protocolos recebidos
app.get("/protocolos-recebidos", (req, res) => {
  db.all("SELECT * FROM protocolos_recebidos", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao consultar o banco de dados.");
    } else {
      res.json(rows);
    }
  });
});
