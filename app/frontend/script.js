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
    input.oninput = function() {
        update_preview(input.id, preview_question)
    }
    div.appendChild(input);

    var button = document.createElement('button');
    var icon = document.createElement('i');
    icon.classList.add('bi', 'bi-x-lg');
    button.appendChild(icon);
    button.onclick = function() {
        deletar_questaoespecifica(this, preview_question);
    };
    div.appendChild(button);

    document.getElementById('questions-form').appendChild(div);
    atualizarIDs()
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

function update_preview(question, previewDivId) {
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
}