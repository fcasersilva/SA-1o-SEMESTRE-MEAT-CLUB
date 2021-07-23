const container = document.getElementById("container");

function CarregaCervejas() {
    let cervejas = JSON.parse(localStorage.getItem("cerveja"));
    
    if(cervejas == null) {
        cervejas = [];
    }

    return cervejas;
}

function CriaProdutos() {
    container.innerText = '';
    const cervejas = CarregaCervejas();

    for(let i = 0; i < cervejas.length; i++) {
        let cerveja = cervejas[i];
        CriaProduto("undefinid", cerveja.preco, cerveja.quantidade);
    }
}

function CriaProduto(produto, preco, quantidade) {
    const tr = document.createElement("tr");

    const th = [
        CriaTh(produto),
        CriaTh(preco),
        CriaTh(quantidade)
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

function Pagar() {
    localStorage.setItem("cerveja", null);
    container.innerText = '';
}