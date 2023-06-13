const on_load_pesquisador = () => {
  console.log("entrou na função");
  axios
    .get(" http://localhost:1234/visualizar_protocolos/")

    .then((response) => {
      const protocolos = response.data;

      console.log(protocolos);

      // let array_html_abertas = [];
      // let array_html_enviadas = [];

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

        // if (protocolo.ESTADO === "Em aberto") {
        //   array_html_abertas.push(html);
        //   // coletas_abertas.innerHTML += html;
        // } else {
        //   array_html_enviadas.push(html);
        //   // coletas_enviadas.innerHTML += html;
        // }

        // console.log(array_html_abertas);
      });
      const teste = document.getElementById("card");
      teste.innerHTML += html;
      // const coletas_enviadas = document.getElementById("coletas_enviadas");

      // array_html_abertas.forEach((trecho_html) => {
      //   coletas_abertas.innerHTML += trecho_html;
      // });
      // array_html_enviadas.forEach((trecho_html) => {
      //   coletas_enviadas.innerHTML += trecho_html;
      // });
    })
    .catch((error) => {
      console.log(error);
    });
};
