var index = 0;
var div

document.addEventListener('DOMContentLoaded', function() {
    // Aguarda o carregamento completo da página antes de executar o código interno.
    
    var nome_input = document.getElementById("nome-input");
    nome_input.oninput = function() {
        // Quando o valor do input com o id "nome-input" é alterado, essa função é executada.
        
        var nome_input_value = document.getElementById('nome-input').value;
        // Obtém o valor do input com o id "nome-input".
        
        document.getElementById('nome-protocolo').innerHTML = nome_input_value;
        // Define o valor obtido como o conteúdo do elemento com o id "nome-protocolo".
    };

    var descricao_input = document.getElementById("descricao-input");
    descricao_input.oninput = function() {
        // Quando o valor do input com o id "descricao-input" é alterado, essa função é executada.
        
        var descricao_input_value = document.getElementById('descricao-input').value;
        // Obtém o valor do input com o id "descricao-input".
        
        document.getElementById('descricao-protocolo').innerHTML = descricao_input_value;
        // Define o valor obtido como o conteúdo do elemento com o id "descricao-protocolo".
    };
});

function showToast() {
    // Essa função é chamada quando um evento específico ocorre em algum lugar do código.
    
    var toast = document.getElementById("myToast");
    // Obtém o elemento com o id "myToast".
    
    toast.innerHTML = "Protocolo enviado!";
    // Define o conteúdo desse elemento como a string "Protocolo enviado!".
    
    toast.classList.add("show");
    // Adiciona a classe "show" ao elemento, para exibir o toast (mensagem temporária).
    
    setTimeout(function(){
        // Define um temporizador para aguardar um determinado tempo antes de executar o código interno.
        
        toast.classList.remove("show");
        // Remove a classe "show" do elemento, ocultando o toast.
        
        window.location.href = '/Home-pesquisador';
        // Redireciona o navegador para a página com o caminho "/Home-pesquisador".
    }, 3000);
}


function add_question() {
    index++;
    // Incrementa o índice para garantir que cada pergunta tenha um ID único.

    div = document.createElement('div');
    div.id = 'question' + index;
    div.classList.add('questions-container');
    // Cria uma div com um ID exclusivo para cada pergunta e adiciona a classe 'questions-container'.

    var hr = document.createElement('hr');
    hr.classList.add('hr', 'hr-blurry');
    div.appendChild(hr);
    // Cria uma linha horizontal para dividir visualmente as perguntas e adiciona à div.

    var input = document.createElement('input');
    input.id = "input" + index;
    input.classList.add('questions');
    input.type = 'text';
    input.placeholder = 'Escreva a questão...';
    var preview_question = "preview-question" + index;
    div.appendChild(input);
    // Cria um elemento de input para digitar o enunciado da pergunta, atribui um ID único e adiciona à div.

    var button = document.createElement('button');
    var icon = document.createElement('i');
    icon.classList.add('bi', 'bi-x-lg');
    button.appendChild(icon);
    button.onclick = function() {
        delete_question(this, preview_question);
    };
    div.appendChild(button);
    // Cria um botão com um ícone para remover a pergunta em que ele estiver acoplado e adiciona à div.

    var input_type = document.createElement('select');
    input_type.name = "input_type";
    input_type.classList.add('data_type');
    // Cria um elemento de seleção (select) para escolher o tipo de resposta da pergunta.

    var types = ['text', 'date', 'number', 'select'];
    // Define uma array com os tipos de resposta aceitos.

    for (let i = 0; i < types.length; i++) {
        var option = document.createElement('option');
        option.value = types[i];
        option.textContent = types[i];
        input_type.appendChild(option);
    }
    // Cria opções para cada tipo de resposta aceito e adiciona ao elemento select.

    div.appendChild(input_type);
    // Adiciona o elemento de seleção à div.

    input_type.addEventListener('change', function() {
        if (input_type.value === 'select') {
            add_alternative(this);
        } else {
            var elementToRemove = div.querySelector('.alternatives');
            if (elementToRemove) {
                elementToRemove.remove();
            }
        }
    });
    // Adiciona um ouvinte de evento para detectar mudanças no tipo de resposta escolhido.
    // Se o tipo for "select", chama a função add_alternative(), caso contrário, remove as alternativas existentes.

    var index_option = 0;
    function add_alternative(this_alternative) {
        index_option++;
        var div_alternative = document.createElement('div');
        div_alternative.id = "alternative" + index_option;
        // Cria uma div para cada alternativa de resposta com um ID único.

        var alternative = document.createElement('input');
        alternative.classList.add('alternatives-question' + index);
        alternative.classList.add('alternatives');
        alternative.placeholder = 'Escreva a alternativa...';

        alternative.oninput = function () {
            update_preview(div_alternative.parentNode.parentNode, preview_question, 'select');
        };
        // Cria um elemento de input para digitar a alternativa de resposta, adiciona classes e define um ouvinte para atualizar a pré-visualização quando houver entrada de texto.

        var button_add = document.createElement('button');
        button_add.textContent = "+";
        button_add.onclick = function() {
            add_alternative(this.parentNode);
        };

        var button_remove = document.createElement('button');
        var icon = document.createElement('i');
        icon.classList.add('bi', 'bi-x-lg');
        button_remove.appendChild(icon);
        button_remove.onclick = function() {
            delete_alternative(this.parentNode);
        };
        // Cria botões de adicionar e remover alternativas, definindo ouvintes para chamar as funções correspondentes.

        div_alternative.appendChild(alternative);
        div_alternative.appendChild(button_add);
        div_alternative.appendChild(button_remove);
        // Adiciona o input e os botões à div de alternativa.

        document.getElementById(this_alternative.parentNode.id).appendChild(div_alternative);
        // Adiciona a div de alternativa à div de pergunta correspondente.

    }

    function delete_alternative(this_alternative) {
        var alternative_to_remove = this_alternative;
        alternative_to_remove.remove(alternative_to_remove.parentNode);
    }
    // Função para remover uma alternativa específica.

    document.getElementById('questions-form').appendChild(div);
    // Adiciona a div da pergunta ao formulário de perguntas.

    input.oninput = function() {
        update_preview(input.id, preview_question, input_type.value);
    };

    input_type.oninput = function() {
        update_preview(input.id, preview_question, input_type.value);
    };
    // Define ouvintes de evento para atualizar a pré-visualização sempre que o input ou o tipo de resposta for alterado.
}

var img_div;
var index_img = 0;

function askfile() {
    index_img++;

    img_div = document.createElement('div');
    img_div.id = 'image' + index_img;
    img_div.classList.add('images-container');
    // Cria uma div com um ID único para cada imagem e adiciona a classe 'images-container'.

    var hr = document.createElement('hr');
    hr.classList.add('hr', 'hr-blurry');
    img_div.appendChild(hr);
    // Cria uma linha horizontal para dividir visualmente as imagens e adiciona à div.

    var input = document.createElement('input');
    input.id = "inputimg" + index_img;
    input.classList.add('images');
    input.type = 'text';
    input.placeholder = 'Escreva qual foto deve ser enviada...';
    var preview_question = "preview-images" + index_img;
    input.oninput = function() {
        update_preview(input.id, preview_question, "file");
    };
    img_div.appendChild(input);
    // Cria um elemento de input para digitar a descrição da imagem, atribui um ID único e adiciona à div.

    var button = document.createElement('button');
    var icon = document.createElement('i');
    icon.classList.add('bi', 'bi-x-lg');
    button.appendChild(icon);
    button.onclick = function() {
        delete_question(this, preview_question);
    };
    img_div.appendChild(button);
    // Cria um botão com um ícone para remover a imagem em que ele estiver acoplado e adiciona à div.

    document.getElementById('images-form').appendChild(img_div);
    // Adiciona a div da imagem ao formulário de imagens.
}

// Ao clicar no ícone de remover pergunta, remove a div através do id e atualiza os IDs das outras divs
function delete_question(button, preview_question) {
    var div = button.parentNode;
    var previewDiv = document.getElementById(preview_question);
    div.remove(); // Remove a div da pergunta
    previewDiv.remove(); // Remove a div de pré-visualização da pergunta
}

// Cria uma div de pré-visualização caso não exista, ou sobreescreve com o que está sendo escrito como enunciado
function update_preview(question, previewDivId, input_type) {
    var input = document.getElementById(question);
    var previewDiv = document.getElementById(previewDivId);

    if (!previewDiv) {
        // Se a div de pré-visualização não existir, cria uma nova div
        previewDiv = document.createElement('div');
        previewDiv.id = previewDivId;
        previewDiv.classList.add('questions-preview');

        if (input_type != 'file') {
            // Se o tipo de entrada não for 'file', adiciona a div ao formulário de pré-visualização de perguntas
            document.getElementById('questions-preview').appendChild(previewDiv);
        } else {
            // Caso contrário, adiciona a div ao formulário de pré-visualização de imagens
            document.getElementById('images-preview').appendChild(previewDiv);
        }
    }

    var h3 = document.createElement('h3');
    h3.textContent = input.value; // Define o texto da pergunta

    previewDiv.innerHTML = ''; // Limpa o conteúdo da div de pré-visualização
    previewDiv.appendChild(h3); // Adiciona o elemento h3 com o texto da pergunta

    if (input_type == 'select') {
        // Se o tipo de entrada for 'select', cria um elemento select para exibir as opções de resposta
        var input_answer = document.createElement('select');
        input_answer.name = 'input_answer';

        var types = document.getElementsByClassName('alternatives');

        for (let i = 0; i < types.length; i++) {
            var inputValue = types[i].value;
            var option = document.createElement('option');
            option.value = inputValue;
            option.textContent = inputValue;
            input_answer.appendChild(option);
        }

        previewDiv.appendChild(input_answer); // Adiciona o select à div de pré-visualização
    } else {
        // Caso contrário, cria um elemento input com o tipo especificado
        var input_answer = document.createElement('input');
        input_answer.type = input_type;
        previewDiv.appendChild(input_answer); // Adiciona o input à div de pré-visualização
    }
}


// Variáveis que vão armazenar todos os dados para envio em formato de JSON
var protocolo_dados; // Armazena os dados gerais do protocolo
var questao; // Armazena os dados de cada pergunta
var imagens_array = []; // Armazena os dados das imagens
var imagens;

var data = []; // Array principal para armazenar os dados do protocolo, perguntas e imagens

// Função chamada quando o formulário de login é submetido
function enviarDatabase() {
    // Obtenção dos elementos de entrada do formulário
    var input_nome = document.querySelector('#nome-input');
    var input_deadline = document.querySelector("#data-limite");
    var input_descricao = document.querySelector("#descricao-input");
    var inputs_enunciados = document.getElementsByClassName("questions"); // Inputs dos enunciados das perguntas
    var inputs_datatype = document.getElementsByClassName("data_type"); // Inputs dos tipos de resposta das perguntas
    var input_imagens = document.getElementsByClassName("images"); // Inputs das imagens

    // Armazenamento dos dados gerais do protocolo
    protocolo_dados = {
        nome: input_nome.value,
        data_limite: input_deadline.value,
        descricao: input_descricao.value,
        estado: 'Em aberto'
    };
    data.push(protocolo_dados); // Adiciona os dados do protocolo ao array principal

    // Loop para percorrer todas as perguntas e seus respectivos tipos de resposta
    for (var i = 0; i < inputs_enunciados.length; i += 1) {
        var pergunta = inputs_enunciados[i].value; // Enunciado da pergunta
        var tipo_resposta = inputs_datatype[i].value; // Tipo de resposta da pergunta

        if (tipo_resposta === 'select') {
            // Caso o tipo de resposta seja 'select' (menu suspenso)
            var inputs_alternativas = document.getElementsByClassName("alternatives-question" + (i + 1)); // Inputs das alternativas da pergunta
            var alternativas = [];

            // Loop para percorrer todas as alternativas da pergunta
            for (var j = 0; j < inputs_alternativas.length; j += 1) {
                alternativas.push(inputs_alternativas[j].value); // Adiciona as alternativas ao array de alternativas
            }

            // Criação do objeto de pergunta com enunciado, tipo de resposta e alternativas
            questao = {
                pergunta: pergunta,
                tipo_resposta: tipo_resposta,
                alternativas: alternativas,
            };
        } else {
            // Caso o tipo de resposta não seja 'select'
            questao = {
                pergunta: pergunta,
                tipo_resposta: tipo_resposta,
                alternativas: [],
            };
        }

        data.push(questao); // Adiciona os dados da pergunta ao array principal
    }

    // Loop para percorrer todas as imagens
    for (var i = 0; i < input_imagens.length; i += 1) {
        var imagem = input_imagens[i].value; // URL ou descrição da imagem

        // Criação do objeto de imagem
        imagens = {
            imagem: imagem,
        };

        imagens_array.push(imagens); // Adiciona os dados da imagem ao array de imagens
    }

    data.push(imagens_array); // Adiciona o array de imagens ao array principal
}