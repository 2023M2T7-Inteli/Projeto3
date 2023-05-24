var index = 0;

function add_question() {
    index++;
    var div = document.createElement('div');
    div.id = 'question' + index;
    div.classList.add('questions');

    var hr = document.createElement('hr');
    hr.classList.add('hr', 'hr-blurry');
    div.appendChild(hr);

    var input = document.createElement('input');
    input.id = "input" + index
    input.type = 'text';
    input.placeholder = 'Escreva a questão...';
    var preview_question = "preview-question" + index
    div.appendChild(input);

    var button = document.createElement('button');
    var icon = document.createElement('i');
    icon.classList.add('bi', 'bi-x-lg');
    button.appendChild(icon);
    button.onclick = function() {
        deletar_questaoespecifica(this, preview_question);
    };
    div.appendChild(button);

    var input_type = document.createElement('select')
    input_type.name = "input_type"

    var types = ['text', 'date', 'number', 'alternativa']

    for(let i = 0; i < types.length; i++){
        var option = document.createElement('option')
        option.value = types[i]
        option.textContent = types[i] 

        input_type.appendChild(option)
    }

    div.appendChild(input_type)

    document.getElementById('questions-form').appendChild(div);
    atualizarIDs()

    input.oninput = function() {
        update_preview(input.id, preview_question, input_type.value)
    }

    input_type.oninput = function() {
        update_preview(input.id, preview_question, input_type.value)
        if(input_type === "alternativa") {
            var input = document.createElement('select');
            input_type.name = "alternatives"

            var question_alternatives = []
        }
    }
}

function atualizarIDs() {
    var perguntas = document.getElementsByClassName('questions');
    for (var i = 0; i < perguntas.length; i++) {
        perguntas[i].id = 'question' + (i + 1);
    }
}

function deletar_questaoespecifica(button, preview_question) {
    var div = button.parentNode;
    var previewDiv = document.getElementById(preview_question);
    div.remove();
    previewDiv.remove()
    atualizarIDs();
}

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

    var input_answer = document.createElement('input')
    if(input_type != 'alternativa'){
        input_answer.type = input_type
        previewDiv.appendChild(input_answer)
    }
}