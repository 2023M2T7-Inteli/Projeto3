var index = 0;
var div

document.addEventListener('DOMContentLoaded', function() {
    var nome_input = document.getElementById("nome-input");
    nome_input.oninput = function() {
        var nome_input_value = document.getElementById('nome-input').value;
        document.getElementById('nome-protocolo').innerHTML = nome_input_value;
    };

    var descricao_input = document.getElementById("descricao-input");
    descricao_input.oninput = function() {
        var descricao_input_value = document.getElementById('descricao-input').value;
        console.log(descricao_input_value)
        document.getElementById('descricao-protocolo').innerHTML = descricao_input_value;
    };
});


// Adiciona um campo de pergunta na criação de protocolo

function add_question() {
    index++;
    // Cria uma div com um id de questão único 
    div = document.createElement('div');
    div.id = 'question' + index;
    div.classList.add('questions-container');


    // Adiciona a divisória
    var hr = document.createElement('hr');
    hr.classList.add('hr', 'hr-blurry');
    div.appendChild(hr);

    // Cria um input para digitar o enunciado da questão
    var input = document.createElement('input');
    input.id = "input" + index
    input.classList.add('questions')
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
    input_type.classList.add('data_type')

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
            add_alternative(this)

        } else {
            var elementToRemove = div.querySelector('.alternatives')
            if (elementToRemove) {
                elementToRemove.remove();
            }
        }

    });

    var index_option = 0
    function add_alternative(this_alternative) {
        index_option++
        var div_alternative = document.createElement('div')
        div_alternative.id = "alternative" + index_option
        var alternative = document.createElement('input')
        alternative.classList.add('alternatives-question' + index);
        alternative.classList.add('alternatives');
        alternative.placeholder = 'Escreva a alternativa...';

        alternative.oninput = function () {
            update_preview(div_alternative.parentNode.parentNode, preview_question, 'select')
        }

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
        
        div_alternative.appendChild(alternative);
        div_alternative.appendChild(button_add);
        div_alternative.appendChild(button_remove);

        document.getElementById(this_alternative.parentNode.id).appendChild(div_alternative)

    }

    function delete_alternative(this_alternative) {
        var alternative_to_remove = this_alternative;
        alternative_to_remove.remove(alternative_to_remove.parentNode);
    }
    // Adiciona a div com todas as informações anteriores e dá um update na numeração de IDs (caso as perguntas sejam apagadas, os números serão substituídos)
    document.getElementById('questions-form').appendChild(div);

    // Atualiza a pré-visualização sempre que um input ou o tipo de resposta for alterado
    input.oninput = function() {
        update_preview(input.id, preview_question, input_type.value)
    }

    input_type.oninput = function() {
        update_preview(input.id, preview_question, input_type.value)
    }
}

var img_div
var index_img = 0
function askfile() {
    index_img++

    img_div = document.createElement('div');
    img_div.id = 'image' + index_img;
    img_div.classList.add('images-container');
    
    // Adiciona a divisória
    var hr = document.createElement('hr');
    hr.classList.add('hr', 'hr-blurry');
    img_div.appendChild(hr);

    // Cria um input para digitar o enunciado da questão
    var input = document.createElement('input');
    input.id = "input" + index_img
    input.classList.add('images')
    input.type = 'text';
    input.placeholder = 'Escreva qual foto deve ser enviada...';
    var preview_question = "preview-images" + index_img
    input.oninput = function() {
        update_preview(input.id, preview_question, "file")
    }
    img_div.appendChild(input);
    
    var button = document.createElement('button');
    var icon = document.createElement('i');
    icon.classList.add('bi', 'bi-x-lg');
    button.appendChild(icon);
    button.onclick = function() {
        delete_question(this, preview_question);
    };
    img_div.appendChild(button);

    document.getElementById('images-form').appendChild(img_div);    
}

// Ao clicar no ícone de remover pergunta, remove a div através do id e atualiza os IDs das outras divs
function delete_question(button, preview_question) {
    var div = button.parentNode;
    var previewDiv = document.getElementById(preview_question);
    div.remove();
    previewDiv.remove()
}

// Cria uma div de pré-visualização caso não exista, ou sobreescreve com o que está sendo escrito como enunciado
function update_preview(question, previewDivId, input_type) {
    var input = document.getElementById(question);
    var previewDiv = document.getElementById(previewDivId);

    if (!previewDiv) {
        previewDiv = document.createElement('div');
        previewDiv.id = previewDivId;
        previewDiv.classList.add('questions-preview');
        
        if(input_type != 'file'){
            document.getElementById('questions-preview').appendChild(previewDiv);
        } else {
            document.getElementById('images-preview').appendChild(previewDiv);
        }
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