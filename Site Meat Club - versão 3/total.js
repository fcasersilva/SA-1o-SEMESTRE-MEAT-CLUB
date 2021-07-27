const labelTotal = document.getElementById("total");

function DrawTotal() {
    let total = CalculaCervejas();
    labelTotal.innerText = `Total (R$): ${total}`;
}

function CalculaCervejas() {
    let cervejas = JSON.parse(localStorage.getItem("cerveja"));
    
    if(cervejas == null) {
        cervejas = [];
    }

    let total = 0;
    for(let i = 0; i < cervejas.length; i++) {
        const cerveja = cervejas[i];
        total += cerveja.preco * cerveja.quantidade;
    }

    return Number(total.toFixed(2));
}