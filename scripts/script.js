let arrayObjetos = [];
let listagem = document.getElementsByClassName("scroll")[0];
let tituloSemConteudo = document.getElementById("titulo-sem-conteudo");

arrayObjetos = JSON.parse(localStorage.getItem("arrayObjetos")) || [];

textoSemJogos();
renderizarJogos();

function coletarDados() {
    let nome = document.getElementById("inome").value;
    let descricao = document.getElementById("idescricao").value;
    let favorito = favoritarJogos();

    let objeto = {
        nome: nome,
        descricao: descricao,
        favorito: favorito
    }

    if (nomesIguais(nome)){
        alerta("error", "Oops...", "Jogo já adicionado, adicione outro!");
    } else if (nome === ""){
        alerta("error", "Oops...", "Adicione um nome!");
    } else {
        arrayObjetos.push(objeto);
        localStorage.setItem("arrayObjetos", JSON.stringify(arrayObjetos));
        
        textoSemJogos();
        limparCampos();
        alerta("success", "Boa...", "Jogo adicionado com sucesso!");
    }

    renderizarJogos();
}

function renderizarJogos() {
    let elementosHTML = "";
    let jogosFavoritos = [];
    let jogosNaoFavoritos = [];
    
    arrayObjetos.sort((antes, depois) => antes.nome.localeCompare(depois.nome));

    arrayObjetos.forEach((valor, index) => {
        const elemento = `
            <div id="${valor.favorito}" class="games">
                <div class="esquerda">
                    <img class="img1" src="img/joystick-svgrepo-com 1.svg" alt="imagem do joystick">
                </div>
                <div class="conteudo">
                    <p class="titulo">${valor.nome}</p>
                    <p class="paragrafo">${valor.descricao}</p>
                </div>
                <div class="direita">
                    <a onclick="removerJogos(${index})"><img class="img2" src="img/trash 1.svg" alt="lixinho"></a>
                    ${valor.favorito === "on" ?
                    `<a onclick="favoritarPelaEstrela(${index})"><img class="img3" src="img/star-outline-svgrepo-com 1.svg" alt="estrela vazia"></a>`:
                    `<a onclick="favoritarPelaEstrela(${index})"><img class="img3" src="img/star-offtline-svgrepo-com 1.svg" alt="estrela vazia"></a>`}
                </div>
            </div>
        `;

        valor.favorito === "on" ? jogosFavoritos.push(elemento) : jogosNaoFavoritos.push(elemento);
        elementosHTML += elemento;
    })

    let ordenado = jogosFavoritos.concat(jogosNaoFavoritos).join('');
    listagem.innerHTML = ordenado;
}

function removerJogos(index) {
    arrayObjetos.splice(index, 1);
    localStorage.setItem("arrayObjetos", JSON.stringify(arrayObjetos));
    alerta("success", "Deletado", "Jogo deletado com sucesso!");
    renderizarJogos();
    textoSemJogos();
}

function favoritarJogos() {
    let valueCheckButton = document.querySelector("input[type=radio][name=devweb]:checked");
    if (valueCheckButton === null) {
        return "off";
    }
    return valueCheckButton.value;
}

function favoritarPelaEstrela(index) {
    if (arrayObjetos[index].favorito === "on") {
        arrayObjetos[index].favorito = "off";
        alerta("warning", "Não favoritado", "Jogo marcado como não favorito!");
    } else {
        arrayObjetos[index].favorito = "on";
        alerta("success", "Favoritado", "Jogo marcado como favorito!");
    }

    localStorage.setItem("arrayObjetos", JSON.stringify(arrayObjetos));
    renderizarJogos();
}

function nomesIguais(nome) {
    let verificador = false;
    arrayObjetos.forEach((valor) => {
        if (valor.nome.toLowerCase() === nome.toLowerCase()) {
            verificador = true;
        } 
    });
    return verificador;
}

function limparCampos() {
    document.getElementById('inome').value = "";
    document.getElementById('idescricao').value = "";
    let radioButtons = document.querySelectorAll('input[type=radio][name=devweb]:checked');
    radioButtons.forEach((selecionado) => selecionado.checked = false);
}

function textoSemJogos() {
    if (arrayObjetos.length === 0) {
        const elemento = `<h1>Não há jogos cadastrados</h1>`;
        tituloSemConteudo.innerHTML = elemento;
        tituloSemConteudo.style.display = "block";
        renderizarJogos();
    } else {
        tituloSemConteudo.style.display = "none";
    }
}

function alerta(status, title, text) {
    Swal.fire({
        icon: `${status}`,
        title: `${title}`,
        text: `${text}`,
    });
}