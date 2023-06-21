function redirecionaHomeColetor(id_protocolo) {
  // Cria um objeto com os dados do usuário
  console.log(id_protocolo)
  var data = {
    "id_protocolo": id_protocolo
  };
  const url = '/visualizar_responder_protocolo/' + `${id_protocolo}`; // Define a URL da rota do backend
  // Envia uma requisição POST para o backend com os dados do usuário
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    // Verifica se a resposta da requisição foi bem-sucedida
    if (response.ok) {
      window.location.href = '/responderprotocolo/' + `${id_protocolo}`;
      // Analisa a resposta JSON
      response.json()
      console
    } else {
      // Exibe uma mensagem de erro caso a requisição tenha falhado
      console.log("Erro na requisição:", response.status);
    }
  });
};
const on_load_coletor = () => {
axios
  .get(" http://localhost:1234/visualizar_protocolos/")
  .then((response) => {
    const protocolos = response.data;
    console.log(protocolos);
    let array_html_abertas = [];
    let array_html_enviadas = [];
    protocolos.forEach((protocolo) => {
      const { nome, descricao, data_limite, estado, id_protocolo } = protocolo;
      let html = "";
      html += `<div class="amostra" onclick="redirecionaHomeColetor(${protocolo.ID_PROTOCOLO})">
      <img
        class="imagens_das_amostras"
        src="../img/img_fruta_teste.jpg"
        alt="Fruta 1"
      />
      <div class="texto_das_amostras">
        <h4 class="nome_amostra">${protocolo.NOME}</h4>
        <p class="validade_amostra">${protocolo.DATA_LIMITE}</p>
        <input id="${protocolo.ID_PROTOCOLO}" type="hidden" value="${protocolo.ID_PROTOCOLO}">
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
function transformaPagina() {
document.getElementById('')
}