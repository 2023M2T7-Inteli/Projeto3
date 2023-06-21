const on_load = () => {
  adiciona_pergunta();
};

const adiciona_pergunta = () => {
  axios
    .get("http://localhost:1234/visualizar_perguntas")
    .then((response) => {
      const perguntas = response.data;
      console.log(perguntas);

      perguntas.forEach((pergunta) => {
        console.log("entra no loop");
        //dá pra adicionar um if pro tipo da pergunta
        let html = "";
        html +=
          "<div><h4>" +
          pergunta.PERGUNTA +
          "</h4><input class='resposta'></div>";

        console.log(html);
        document.getElementById("perguntas").innerHTML = html;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const submeter_respostas = () => {
  const respostas = {};
};
