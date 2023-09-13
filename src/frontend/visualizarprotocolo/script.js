const on_load = () => {
    adiciona_pergunta();
  };
  
  const adiciona_pergunta = () => {
    const path = window.location.pathname;
    const id_url = path.split("/").pop();
  
    console.log("ID: ", id_url);
  
    axios
      .get("http://localhost:1234/visualizar_perguntas_/" + id_url)
      .then((response) => {
        const vProtocolo = response.data;
        console.log(vProtocolo);
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
  
  