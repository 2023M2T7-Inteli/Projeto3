function redireciona_responderProtocolo() {
  window.location.pathname = "responderprotocolo/responderprotocolo.html";
}

// window.addEventListener("load", le_protocolo); //especificar arquivo homecoletor.html.

function le_protocolo() {
  axios
    .get("http://127.0.0.1:3000/visualizar_protocolos")

    .then(function (response) {
      const protocolo = response.protocolo;
      console.log(response.nome);
      console.log(response.descricao);
      console.log("Data limite do protocolo é: " + response.data_limite);
      console.log(response.estado);
    })
    .catch(function (error) {
      console.log(error);
    });
}
le_protocolo();
