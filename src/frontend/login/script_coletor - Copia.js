
function Login() {
  document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var data = {
      "email": email,
      "senha": senha,
    };

    const url = '/login_Usuario';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          if (data.souColetor) {
            window.location.pathname = "../home-coletor/homecoletor.html";
          } else if (data.souPesquisador) {
            window.location.pathname = "../Home-pesquisador/home-pesquisador.html";
          }
        });
      } else {
        console.log(response);
      }
    });
  });
}
