let arrayObjetos = [];
let listagem = document.getElementsByClassName("scroll")[0];

function coletarDados() {
    let nome = document.getElementById("inome").value;
    let descricao = document.getElementById("idescricao").value;
    let favorito = favoritarJogos();

    let objeto = {
        nome: nome,
        descricao: descricao,
        favorito: favorito
    }

    arrayObjetos.push(objeto);
    console.log(arrayObjetos);
    renderizarJogos();
}

function renderizarJogos() {
    let elementosHTML = "";
    let jogosFavoritos = [];
    let jogosNaoFavoritos = [];
    
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
                    `<img class="img3" src="img/star-outline-svgrepo-com 1.svg" alt="estrela vazia">`:
                    `<img class="img3" src="img/star-offtline-svgrepo-com 1.svg" alt="estrela vazia">`}
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
    renderizarJogos();
}

function favoritarJogos() {
    let valueCheckButton = document.querySelector("input[type=radio][name=devweb]:checked");
    return valueCheckButton.value;
}