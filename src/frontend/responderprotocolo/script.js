const on_load = () => {
  adiciona_protocolo();
};

const adiciona_protocolo = () => {
  axios
    .get(" http://localhost:1234/responderprotocolo/")

    .then((response) => {
      const pergunta = response.data;

      console.log(pergunta);

      let array_html_abertas = [];
      let array_html_enviadas = [];

      pergunta.forEach((pergunta) => {
        const {  } = pergunta
        let html = "";

        html += `<div class="amostra">
        <div class="texto_das_amostras">
          <h4 class="nome_amostra">${protocolo.NOME}</h4>
          <p class="validade_amostra">${protocolo.DATA_LIMITE}</p>
          </div>
          </div>`;

        if (protocolo.ESTADO === "Em aberto") {
          array_html_abertas.push(html);
          // coletas_abertas.innerHTML += html;
        } else {
          array_html_enviadas.push(html);
          // coletas_enviadas.innerHTML += html;
        }

        console.log(array_html_abertas);
      });
      const coletas_abertas = document.getElementById("coletas_abertas");
      const coletas_enviadas = document.getElementById("coletas_enviadas");

      array_html_abertas.forEach((trecho_html) => {
        coletas_abertas.innerHTML += trecho_html;
      });
      array_html_enviadas.forEach((trecho_html) => {
        coletas_enviadas.innerHTML += trecho_html;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

