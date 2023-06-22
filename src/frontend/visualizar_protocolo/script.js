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
// esse switch verifica cada resposta e monta o html de acordo com o tipo especificado
      perguntas.forEach((pergunta) => {//um loop que monta um html para cada pergunta
        let html = "";
        switch (pergunta.TIPO_INPUT) { // o switch avalia cada caso e monta o html de acordo
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
          case "number": // se o tipo de resposta for um número
            html += `
      <div class="input-container">
        <label for="resposta_${pergunta.ID}">${pergunta.PERGUNTA}</label><br>
        <input type="number" id="resposta_${pergunta.ID}" class="resposta">
      </div>
    `;
            break;
          case "select":// se o o tipo de pergunta for de selecionar
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
