const container = document.getElementById("container");
const historicoDeCervejas = ObtemHistoricoDeCervejas();
const historicoDePlanos = ObtemHistoricoDePlanos();

function CriaProdutos() {
    for(let i = 0; i < historicoDePlanos.length; i++) {
        const plano = historicoDePlanos[i];
        CriaProduto(plano.plano, 1, plano.precoAoMes);

        const cervejas = historicoDeCervejas[i];
        for(let j = 0; j < cervejas.length; j++) {
            const cerveja = cervejas[j];
            CriaProduto(cerveja.nomeCerveja, cerveja.quantidade, cerveja.preco);
        }
        
        if(i < historicoDePlanos.length - 1) {
            CriaProdutoEmpty();
        }
    }
}

function CriaProdutoEmpty() {
    const tr = document.createElement("tr");

    const th = [
        CriaTh(`--`),
        CriaTh(`--`),
        CriaTh(`--`)
    ];

    for(let i = 0; i < th.length; i++) {
        tr.appendChild(th[i]);
    }

    container.appendChild(tr);
}

function CriaProduto(produto, quantidade, preco) {
    const tr = document.createElement("tr");

    const th = [
        CriaTh(produto),
        CriaTh(quantidade),
        CriaTh(`R$ ${preco}`)
    ];

    for(let i = 0; i < th.length; i++) {
        tr.appendChild(th[i]);
    }

    container.appendChild(tr);
}

function CriaTh(texto) {
    const th = document.createElement("th");
    const text = document.createTextNode(texto);
    th.appendChild(text);

    return th;
}


function ObtemHistoricoDeCervejas() {
    const conectado = JSON.parse(localStorage.getItem("conectado"));

    if(conectado == null) return new Array();

    const historico = conectado.historicoCerveja;

    if(historico != null) {
        if(historico.length <= 0) {
            return new Array();
        }

        return historico;
    }

    return new Array();
}

function ObtemHistoricoDePlanos() {
    const conectado = JSON.parse(localStorage.getItem("conectado"));
    
    if(conectado == null) return new Array();

    const historico = conectado.historicoPlano;

    if(historico != null) {
        if(historico.length <= 0) {
            return new Array();
        }

        return historico;
    }

    return new Array();
}