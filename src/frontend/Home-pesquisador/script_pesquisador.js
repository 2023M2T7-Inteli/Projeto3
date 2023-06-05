const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Carregar protocolos já existentes
// utilizar axios.get ao invés de fetch?

function load_question() {
  document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário
    // Obtém os valores dos campos de entrada
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var papel = document.querySelector('input[name="papel"]:checked').value;
    var data = {
      "email": email,
      "senha": senha
    };

    const url = '/protocolos_enviados'; // aqui temos que mudar o banco de dados para uma tabela com login geral
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((response) => {
      let login = response;
      console.log("mauro");
      if (login.message == 'Logado com sucesso.') {
        if (papel == "coletor") {
          window.location.pathname = "../home-coletor/homecoletor.html";
          console.log(data);
        } else if (papel == "pesquisador") {
          window.location.pathname = "../Home-pesquisador/home-pesquisador.html";
          console.log(data);
        }
      } else {
        console.log(response);
      }
    });
  });
}

// Conexão com o banco de dados
const db = new sqlite3.Database('../database/db_obyweb.db');

// Rota para retornar os protocolos enviados
app.get('/protocolos-enviados', (req, res) => {
  db.all('SELECT * FROM protocolos_enviados', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao consultar o banco de dados.');
    } else {
      res.json(rows);
    }
  });
});

// Rota para retornar os protocolos recebidos
app.get('/protocolos-recebidos', (req, res) => {
  db.all('SELECT * FROM protocolos_recebidos', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao consultar o banco de dados.');
    } else {
      res.json(rows);
    }
  });
});

// Iniciar o servidor Exemplo abaixo usando ajax:
/*app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

<!-- Add an empty container to hold the fetched data -->
<div id="protocolos-container"></div>

<script>
  // Make an AJAX request to the API endpoint
  fetch('/api/protocolos-enviados')
    .then(response => response.json())
    .then(data => {
      // Process the fetched data and update the HTML

      // Get the container element
      const container = document.getElementById('protocolos-container');

      // Iterate over the protocolos data
      data.protocolos.forEach(protocolo => {
        // Create a card element for each protocolo
        const card = document.createElement('div');
        card.classList.add('card');

        // Set the card content
        const image = document.createElement('img');
        image.src = protocolo.image;
        image.alt = protocolo.name;
        image.classList.add('h-75');
        card.appendChild(image);

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const title = document.createElement('p');
        title.classList.add('card-title');
        title.innerHTML = `<strong>${protocolo.name}</strong>`;
        cardContent.appendChild(title);

        const date = document.createElement('p');
        date.classList.add('card-date');
        date.textContent = protocolo.date;
        cardContent.appendChild(date);

        card.appendChild(cardContent);

        // Append the card to the container
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
</script>*/
