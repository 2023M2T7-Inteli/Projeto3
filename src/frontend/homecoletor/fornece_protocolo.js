const on_load = () => {
  const le_protocolo = () => {
    axios
      .get(" http://127.0.0.1:3000/visualizar_protocolos")

      .then((response) => {
        const protocolos = response.data;

        console.log(protocolos);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const criar_EstruturaHtml = () => {
    let html = "";

    protocolos.forEach((protocolo) => {
      const { nome, descricao, data_limite, estado } = protocolo;

      html += ` <img
    class="imagens_das_amostras"
    src="../img/img_fruta_teste.jpg"
    alt="Fruta 1"
  />
  <div class="texto_das_amostras">
    <h4 class="nome_amostra">${nome}</h4>
    <p class="validade_amostra">${data_limite}</p>
  </div>`;
    });

    const container = document.getElementById("#container");

    container.innerHTML += html;
  };
};
