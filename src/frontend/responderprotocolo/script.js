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
        //dá pra adicionar um if pro tipo da pergunta
        let html = "";
        switch (pergunta.TIPO_INPUT) {
          case "text":
            html += `
      <div class="input-container">
        <label for="resposta_${pergunta.ID}">${pergunta.PERGUNTA}</label><br>
        <input type="text" id="resposta_${pergunta.ID}" class="resposta">
      </div>
    `;
            break;
          case "date":
            html += `
      <div class="input-container">
        <label for="resposta_${pergunta.ID}">${pergunta.PERGUNTA}</label><br>
        <input type="date" id="resposta_${pergunta.ID}" class="resposta">
      </div>
    `;
            break;
          case "number":
            html += `
      <div class="input-container">
        <label for="resposta_${pergunta.ID}">${pergunta.PERGUNTA}</label><br>
        <input type="number" id="resposta_${pergunta.ID}" class="resposta">
      </div>
    `;
            break;
          case "select":
            html += `
      <div class="input-container">
        <label for="resposta_${pergunta.ID}">${pergunta.PERGUNTA}</label><br>
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

        console.log(html);
        document.getElementById("perguntas").innerHTML += html;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

document.addEventListener("DOMContentLoaded", function () {
  //peguei o valor do input vamoooo
  var meuBotao = document.getElementById("enviar");

  meuBotao.addEventListener("click", function () {
    var meuInput = document.getElementsByClassName("resposta")[0];
    var valor = meuInput.value;
    console.log(valor);
  });
});

// let dados = document.getElementsByClassName("resposta").value;
//   console.log(dados);

//sla oq e isso

// const submeter_respostas = () => {
//   const respostas = {};
//   const inputs = document.getElementsByClassName("resposta");
//   for (let i = 0; i < inputs.length; i++) {
//     const pergunta = perguntas[i].PERGUNTA;
//     const resposta = inputs[i].value;
//     respostas[pergunta] = resposta;
//   }
//   console.log(respostas);
//   // Aqui você pode enviar as respostas para o servidor usando o Axios ou outra biblioteca de requisição HTTP
// };

// //até aqui em cima funciona, agora vamo testar mandar as respostas
