const on_load_pesquisador = () => {
  console.log("entrou na função");
  axios
    .get(" http://localhost:1234/visualizar_protocolos/")

    .then((response) => {
      const protocolos = response.data;

      console.log(protocolos);
      let array_html_abertas = [];
      let array_html_enviadas = [];

      protocolos.forEach((protocolo) => {
        const { nome, descricao, data_limite, estado } = protocolo;

        let html = "";

        html += `<div class="card">
        <img src="img-protocolo.svg"  class="h-75" alt="Semente de Karité, protocolo 1" class="img-protocol">
    <div class="card-content">
        <p class="card-title"><strong>${protocolo.NOME}</strong></p>
        <p class="card-date">${protocolo.DATA_LIMITE}</p>
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
