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


const on_load_pesquisador = () => {
  axios
    .get(" http://localhost:1234/visualizar_protocolos/")

    .then((response) => {
      const protocolos = response.data;

      console.log(protocolos);
      let array_html_abertas = [];
      let array_html_enviadas = [];

      protocolos.forEach((protocolo) => {
        const { id_protocolo, nome, descricao, data_limite, estado } = protocolo;

        let html = "";

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
          // Mudar essas condições para direcionar o protocolo para a coluna certa // talvez mudar banco de dados /comentario 1
          array_html_abertas.push(html);
        } else {
          array_html_enviadas.push(html);
        }
      });

      const cardEnviados = document.getElementById("cardEnviados");
      const cardRecebidos = document.getElementById("cardRecebidos");

      array_html_abertas.forEach((trecho_html) => {
        //Revisar por causa dos estados dos protocolos, referente ao comentario 1
        cardEnviados.innerHTML += trecho_html;
      });
      array_html_enviadas.forEach((trecho_html) => {
        //Revisar por causa dos estados dos protocolos, referente ao comentario 1
        cardRecebidos.innerHTML += trecho_html;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

function filtrar(){
  var input_pesquisa = document.getElementById('input-pesquisa').value;
  console.log(input_pesquisa)

  var data = {
    input: input_pesquisa
  };

  data = JSON.stringify(data)

  axios
    .get("http://localhost:1234/pesquisar_protocolos", {
      params: {
        input: input_pesquisa
      }
    })

    .then((response) => {
      const protocolos = response.data;

      console.log(protocolos);
      let array_html_abertas = [];
      let array_html_enviadas = [];

      var cards = document.getElementsByClassName('card');
      while (cards.length > 0) {
        cards[0].remove();
      }
      protocolos.forEach((protocolo) => {
        const { id_protocolo, nome, descricao, data_limite, estado } = protocolo;

        let html = "";

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
          // Mudar essas condições para direcionar o protocolo para a coluna certa // talvez mudar banco de dados /comentario 1
          array_html_abertas.push(html);
        } else {
          array_html_enviadas.push(html);
        }
      });

      const cardEnviados = document.getElementById("cardEnviados");
      const cardRecebidos = document.getElementById("cardRecebidos");

      array_html_abertas.forEach((trecho_html) => {
        //Revisar por causa dos estados dos protocolos, referente ao comentario 1
        cardEnviados.innerHTML += trecho_html;
      });
      array_html_enviadas.forEach((trecho_html) => {
        //Revisar por causa dos estados dos protocolos, referente ao comentario 1
        cardRecebidos.innerHTML += trecho_html;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function openModal(id) {
  document.getElementById("myModal").style.display = "block";
  document.getElementById("id_hidden").value = id
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

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

