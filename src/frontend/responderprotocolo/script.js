const on_load = () => {
  adiciona_pergunta();
};

const adiciona_pergunta = () => {
  axios
    .get("http://localhost:1234/responder_protocolo")
    .then((response) => {
      console.log(response);
      const perguntas = response.data;
      console.log(perguntas);

      perguntas.forEach((pergunta) => { //dá pra adicionar um if pro tipo da pergunta
        let html = "";
        html += "<div><h4>" + pergunta.PERGUNTA + "</h4><input></div>";

        console.log(html);
        document.getElementById("perguntas").innerHTML = html;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};


            // <div id="perguntas">
            // </div>