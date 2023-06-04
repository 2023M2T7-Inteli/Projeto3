function Login() {
  document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário
    // Obtém os valores dos campos de entrada
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var papel = document.querySelector('input[name="papel"]:checked').value;
    var data = {
      "email": email,
      "senha": senha
    };

    const url = '/login_coletor'; // aqui temos que mudar o banco de dados para uma tabela com login geral
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((response) => {
      let login = response;
      console.log("mauro");
      if (login.message == 'Logado com sucesso.') {
        if (papel == "coletor") {
          window.location.pathname = "../home-coletor/homecoletor.html";
          console.log(data);
        } else if (papel == "pesquisador") {
          window.location.pathname = "../Home-pesquisador/home-pesquisador.html";
          console.log(data);
        }
      } else {
        console.log(response);
      }
    });
  });
}
