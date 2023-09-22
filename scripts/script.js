let arrayObjetos = [];
let listagem = document.getElementsByClassName("scroll")[0];

function coletarDados() {
    let nome = document.getElementById("inome").value;
    let descricao = document.getElementById("idescricao").value;

    let objeto = {
        nome: nome,
        descricao: descricao
    }

    arrayObjetos.push(objeto);
    renderizarJogos();
};


function renderizarJogos() {
    let elementosHTML = "";

    arrayObjetos.forEach((valor, index) => {
        const elemento = `
            <div id="on" class="games">
                <div class="esquerda">
                    <img class="img1" src="img/joystick-svgrepo-com 1.svg" alt="imagem do joystick">
                </div>
                <div class="conteudo">
                    <p class="titulo">${valor.nome}</p>
                    <p class="paragrafo">${valor.descricao}</p>
                </div>
                <div class="direita">
                    <img class="img2" src="img/trash 1.svg" alt="lixinho">
                    <img class="img3" src="img/star-outline-svgrepo-com 1.svg" alt="estrela vazia">
                </div>
            </div>
        `;

        elementosHTML += elemento;
    });

    listagem.innerHTML = elementosHTML;
}