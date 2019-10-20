// selecionando elementos do html
var listElement = document.querySelector('#app ul');
var inputElement = document.getElementById('inptodo');
var buttonElement = document.getElementById('btn');

// array de todos, que foram salvos em localstorage
var todos = JSON.parse(localStorage.getItem('list_todos')) || []; // buscando dados no localstorage caso contrario repassando array vazio

// função que renderiza o array de todos
function renderTodos() {
    listElement.innerHTML = ''; // renderizando sempre vazio para não repetir

    // percorrendo todo o array de todos e retornando para todo
    for(todo of todos) {
        // criando elemento li e recebendo nome de cada todo
        var liElement = document.createElement('li');
        var textElement = document.createTextNode(todo);
        liElement.appendChild(textElement);
        liElement.setAttribute('class', 'list-group-item')

        // criando elemento a para exluir todo quando clicado
        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');
        linkElement.setAttribute('class', 'btn btn-danger mb-3')
        var textLink = document.createTextNode('Exluir');

        // recebendo valor de cada posição vetor atraves do indexOf
        var pos = todos.indexOf(todo); 

        // chamando função pra deletar todo de acordo com a posição no array
        linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')');
        linkElement.appendChild(textLink);

        // ul recebendo a lista de elementos criados acima
        listElement.appendChild(liElement);
        listElement.appendChild(linkElement);
    }
}

renderTodos(); // chamando função

// função adicionar novo todo no array
function addTodo() {
    // recebendo valor do input e adicionando ao array de todos
    var todoNew = inputElement.value;

    // verificando entrada de dados do input
    if(todoNew === '' || todoNew === null || todoNew === undefined) {
        alert("Por favor adicione um nome válido ao todo");
        inputElement.value = ''; // voltando em focus com input com valor vazio
        inputElement.focus();
    } else {
        todos.push(todoNew);
        inputElement.value = '';
        inputElement.focus();
    }
    renderTodos();
    saveToStorage();
}
// adicionando todo quando botão é clicado chamando a função addTodo;
buttonElement.onclick = addTodo;

// função deletar todo do array de acordo com a posição
function deleteTodo(pos) {
    todos.splice(pos, 1); // removendo o proximo item de acordo com a posição repassada

    renderTodos();
    saveToStorage();
}

// função salvar dados do array em localstorage
function saveToStorage() {
    localStorage.setItem('list_todos', JSON.stringify(todos)); // usando o JSON e passando vetor para string
}