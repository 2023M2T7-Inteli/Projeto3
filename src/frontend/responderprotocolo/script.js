const on_load = () => {
  adiciona_pergunta();
};

const adiciona_pergunta = () => {
  const path = window.location.pathname;
  const id_url = path.split("/").pop();

  console.log("ID: ", id_url);

  axios
    .get("http://localhost:1234/visualizar_perguntas/" + id_url)
    .then((response) => {
      const perguntas = response.data;
      console.log(perguntas);

      perguntas.forEach((pergunta) => {
        console.log("entra no loop");
        console.log(pergunta);
        //dá pra adicionar um if pro tipo da pergunta
        let html = "";
        switch (pergunta.TIPO_INPUT) {
          case "text":
            html += `
      <div class="input-container">
        <label for="resposta_${pergunta.ID}">${pergunta.PERGUNTA}</label><br><br>
        <input type="text" id="resposta_${pergunta.ID}" class="resposta">
      </div>
    `;
            break;
          case "date":
            html += `
      <div class="input-container">
        <label for="resposta_${pergunta.ID}">${pergunta.PERGUNTA}</label><br><br>
        <input type="date" id="resposta_${pergunta.ID}" class="resposta">
      </div>
    `;
            break;
          case "number":
            html += `
      <div class="input-container">
        <label for="resposta_${pergunta.ID}">${pergunta.PERGUNTA}</label><br><br>
        <input type="number" id="resposta_${pergunta.ID}" class="resposta">
      </div>
    `;
            break;
          case "select":
            html += `
      <div class="input-container">
        <label for="resposta_${pergunta.ID}">${pergunta.PERGUNTA}</label><br><br>
        <select id="resposta_${pergunta.ID}" class="resposta">
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
        document.getElementById("perguntas").innerHTML += html;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

var valores = [];
var botao = document.getElementById("enviar");

botao.addEventListener("click", function () {
  console.log("botao click");
  var inputs = document.getElementsByClassName("resposta");
  for (let i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    var valor = input.value;
    console.log("input é " + valor);
    valores.push(valor);
  }
  console.log(valores);

  const data = {}; //transormando array VALORES em objeto DATA
  for (let i = 0; i < valores.length; i++) {
    var chave = "chave" + (i + 1);
    data[chave] = valores[i];
  }
  console.log(data);

  // console.log(data.chave1)

  for (let j = 0; j < valores.length; j++) {
    console.log("aaa");
    var atributo = "chave" + (j + 1);
    axios
      .post("/responder_protocolo", data[atributo])
      .then((response) => {
        console.log("acho que deu certo irmao");
      })
      .catch((error) => {
        console.log("acho que deu erro irmao: " + error);
      });
  }
});

//DATA precisa ser um objeto de objetos para passar tanto a resposta quanto o ID_PERGUNTA
