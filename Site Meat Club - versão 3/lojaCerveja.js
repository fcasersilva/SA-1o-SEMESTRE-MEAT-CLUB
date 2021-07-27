const inputsAmounts = document.getElementsByName("amount");
const cervejasAdicionadas = CarregaCervejas();

function CarregaCervejas() {
    let cervejas = JSON.parse(localStorage.getItem("cerveja"));

    if(cervejas == null) {
        cervejas = [];
    }

    return cervejas;
}

function AddAmount(id) {
    const inputAmount = inputsAmounts[id];
    let quantidade = Number(inputAmount.value);
    quantidade++;
    inputAmount.value = quantidade;
}

function RemoveAmount(id) {
    const inputAmount = inputsAmounts[id];
    let quantidade = Number(inputAmount.value);

    if(quantidade <= 0) {
        return;
    }

    quantidade--;
    inputAmount.value = quantidade;
}

function AddCerveja(id, preco) {
    const quantidade = Number(inputsAmounts[id].value);
    
    if(quantidade <= 0) {
        return;
    }

    const cerveja = {
        id: id,
        quantidade: quantidade,
        preco: Number(preco),
    }

    cervejasAdicionadas.push(cerveja);
    SalvaCervejas();
}

function SalvaCervejas() {
    localStorage.setItem("cerveja", JSON.stringify(cervejasAdicionadas));
}