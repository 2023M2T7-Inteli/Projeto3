const on_load = () => {
  adiciona_pergunta();
};

const adiciona_pergunta = () => {

  console.log('entrou na funcao')
  axios
    .get("http://localhost:1234/visualizar_perguntas")
    .then((response) => {
      console.log(response);
      const perguntas = response.data;
      console.log(perguntas);

      perguntas.forEach((pergunta) => { //dá pra adicionar um if pro tipo da pergunta
        let html = "";
        html += "<div><h4>" + pergunta.PERGUNTA + "</h4><input class='resposta'></div>";

        console.log(html);
        document.getElementById("perguntas").innerHTML = html;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// function generateId() {
//     const random = Math.floor(Math.random() * 100);
//     return random; // Retorna o valor gerado
// }

// $("#enviar").on('click', function () {
//     const input = document.getElementsByClassName("texto")[0];
//     const id = generateId(); // Função para gerar um ID único
//     const requestData = { id: id, resposta: input };

//     console.log(JSON.stringify(requestData));

//     fetch("http://localhost:1234/visualizar_perguntas", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(requestData)
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     })
//     .catch(error => {
//         console.error('Erro:', error);
//     });
// });
