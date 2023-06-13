// Função chamada quando o formulário de login é submetido
function Login() {
  // Adiciona um ouvinte de evento ao formulário para capturar o evento de submissão
  document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtém os valores dos campos de entrada
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    // Cria um objeto com os dados do usuário
    var data = {
      "email": email,
      "senha": senha,
    };

    const url = '/login_Usuario'; // Define a URL da rota do backend

    // Envia uma requisição POST para o backend com os dados do usuário
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data), // Converte o objeto em uma string JSON
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      // Verifica se a resposta da requisição foi bem-sucedida
      if (response.ok) {
        // Analisa a resposta JSON
        response.json().then((data) => {
          // Verifica as propriedades da resposta para determinar o tipo de usuário
          if (data.souColetor) {
            // Redireciona o usuário para a página do coletor
            window.location.pathname = "../homecoletor";
          } else if (data.souPesquisador) {
            // Redireciona o usuário para a página do pesquisador
            window.location.pathname = "../Home-pesquisador/";
          } else {
            // Exibe uma mensagem de erro
            console.log(data.message);
          }
        });
      } else {
        // Exibe uma mensagem de erro caso a requisição tenha falhado
        console.log("Erro na requisição:", response.status);
      }
    });
  });
}