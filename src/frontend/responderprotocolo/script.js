const adiciona_pergunta = () => {
  const path = window.location.pathname;
  const id_url = path.split("/").pop();

  console.log("ID: ", id_url);

  axios
    .get("http://localhost:1234/visualizar_perguntas/" + id_url) //recebe as perguntas do endpoint /visualizar_perguntas
    .then((response) => {
      const perguntas = response.data;
      console.log(perguntas);

      perguntas.forEach((pergunta) => {
        //cria o html dos inputs dinamicamente
        console.log(pergunta);
        let html = "";
        switch (pergunta.TIPO_INPUT) {
          case "text":
            html += `
      <div class="input-container">
        <label for="resposta_${pergunta.ID}">${pergunta.PERGUNTA}</label><br>
        <input type="text" id="${pergunta.ID_PERGUNTA}" class="resposta">
      </div>
    `;
            break;
          case "date":
            html += `
      <div class="input-container">
        <label for="resposta_${pergunta.ID}">${pergunta.PERGUNTA}</label><br>
        <input type="date" id="${pergunta.ID_PERGUNTA}" class="resposta">
      </div>
    `;
            break;
          case "number":
            html += `
      <div class="input-container">
        <label for="resposta_${pergunta.ID}">${pergunta.PERGUNTA}</label><br>
        <input type="number" id="${pergunta.ID_PERGUNTA}" class="resposta">
      </div>
    `;
            break;
          case "select":
            html += `
      <div class="input-container">
        <label for="resposta_${pergunta.ID}">${pergunta.PERGUNTA}</label><br>
        <select id="${pergunta.ID_PERGUNTA}" class="resposta">
          <option value="opcao1">Opção 1</option>
          <option value="opcao2">Opção 2</option>
          <option value="opcao3">Opção 3</option>
        </select>
      </div>
    `;
            break;
          default:
            // Tipo de resposta desconhecido
            break;
        }
        console.log(pergunta.ID_PERGUNTA + " " + pergunta.PERGUNTA);
        console.log(html);
        document.getElementById("perguntas").innerHTML += html; //adiciona o html criado dinamicamente a página de responder protocolos
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

var botao = document.getElementById("enviar");

botao.addEventListener("click", function () {
  //pega os valor e o id_pergunta de cada input no click do botão
  var inputs = document.getElementsByClassName("resposta");

  for (let i = 0; i < inputs.length; i++) {
    //manda o valor e o id_pergunta para o endpoint /responder_protocolo um de cada vez
    var input = inputs[i];
    var valor = input.value;
    var id_pergunta = input.id;

    axios
      .post("/responder_protocolo", { id_pergunta: id_pergunta, valor: valor })
      .then((response) => {
        console.log("enviou!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
