var index = 0;

// Adiciona um campo de pergunta na criação de protocolo
function add_question() {
    index++;
    // Cria uma div com um id de questão único 
    var div = document.createElement('div');
    div.id = 'question' + index;
    div.classList.add('questions');

    // Adiciona a divisória
    var hr = document.createElement('hr');
    hr.classList.add('hr', 'hr-blurry');
    div.appendChild(hr);

    // Cria um input para digitar o enunciado da questão
    var input = document.createElement('input');
    input.id = "input" + index
    input.type = 'text';
    input.placeholder = 'Escreva a questão...';
    var preview_question = "preview-question" + index
    div.appendChild(input);

    // Cria o botão para remover a questão em que ele estiver acoplado
    var button = document.createElement('button');
    var icon = document.createElement('i');
    icon.classList.add('bi', 'bi-x-lg');
    button.appendChild(icon);
    button.onclick = function() {
        delete_question(this, preview_question);
    };
    div.appendChild(button);

    // Menu de select com os tipos de resposta aceitos pelo formulário. Serão armazenados na array "types" e adicionados através de um looping
    var input_type = document.createElement('select')
    input_type.name = "input_type"

    var types = ['text', 'date', 'number', 'select']

    for(let i = 0; i < types.length; i++){
        var option = document.createElement('option')
        option.value = types[i]
        option.textContent = types[i] 
        input_type.appendChild(option)
    }

    div.appendChild(input_type)

    input_type.addEventListener('change', function() {
        
        if (input_type.value === 'select') {
            // Cria o elemento desejado
            var alternative = document.createElement('input')
            alternative.className = "alternatives";
            alternative.placeholder = 'Escreva a alternativa...';

            var button = document.createElement('button');
            button.textContent = "+";
            button.onclick = function() {
                add_alternative(this, preview_question);
            };
            div.appendChild(alternative);
            div.appendChild(button);

        } else {
            var elementToRemove = div.querySelector('.alternatives')
            if (elementToRemove) {
                elementToRemove.remove();
              }
        }

    });

    // Adiciona a div com todas as informações anteriores e dá um update na numeração de IDs (caso as perguntas sejam apagadas, os números serão substituídos)
    document.getElementById('questions-form').appendChild(div);
    updateID()

    // Atualiza a pré-visualização sempre que um input ou o tipo de resposta for alterado
    input.oninput = function() {
        update_preview(input.id, preview_question, input_type.value)
    }

    input_type.oninput = function() {
        update_preview(input.id, preview_question, input_type.value)
    }
}

// Seleciona todas as questões pela classe e atualiza as variáveis pelo looping
function updateID() {
    var question_id = document.getElementsByClassName('questions');
    for (var i = 0; i < question_id.length; i++) {
        question_id[i].id = 'question' + (i + 1);
    }
}

function add_alternative(this_alternative, preview_question) {
    var div = this_alternative.parentNode
    var alternative = document.createElement('input')
    alternative.className = "alternatives";
    alternative.placeholder = 'Escreva a alternativa...';

    var button = document.createElement('button');
    button.textContent = "+";
    button.onclick = function() {
        add_alternative(this, preview_question);
    };

    div.appendChild(alternative);
    div.appendChild(button);
}

alternative.oninput = function() {
    update_preview(input.id, preview_question, input_type.value)
}

// Ao clicar no ícone de remover pergunta, remove a div através do id e atualiza os IDs das outras divs
function delete_question(button, preview_question) {
    var div = button.parentNode;
    var previewDiv = document.getElementById(preview_question);
    div.remove();
    previewDiv.remove()
    updateID();
}

// Cria uma div de pré-visualização caso não exista, ou sobreescreve com o que está sendo escrito como enunciado
function update_preview(question, previewDivId, input_type) {
    var input = document.getElementById(question);
    var previewDiv = document.getElementById(previewDivId);

    if (!previewDiv) {
        previewDiv = document.createElement('div');
        previewDiv.id = previewDivId;
        previewDiv.classList.add('questions-preview');

        document.getElementById('questions-preview').appendChild(previewDiv);
    }

    var h3 = document.createElement('h3');
    h3.textContent = input.value;

    previewDiv.innerHTML = '';
    previewDiv.appendChild(h3);

    // Cria um input de resposta com o tipo selecionado.
    if(input_type == 'select'){
        // Caso seja do tipo select, cria um menu suspenso com as alternativas possíveis
        var input_answer = document.createElement('select')
        input_answer.name = "input_answer"

        var types = document.getElementsByClassName("alternatives")

        for(let i = 0; i < types.length; i++){
            var inputValue = types[i].value;
            console.log(inputValue)
            // Cria um elemento option e define seu valor e conteúdo
            var option = document.createElement('option');
            option.value = inputValue;
            option.textContent = inputValue;
            input_answer.appendChild(option)
        }

        previewDiv.appendChild(input_answer)

    } else {
        
        // Caso contrário, cria um input do tipo requisitado
        var input_answer = document.createElement('input')
        input_answer.type = input_type
        previewDiv.appendChild(input_answer)

    }
}