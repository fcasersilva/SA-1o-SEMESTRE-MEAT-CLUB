const inputsAmounts = document.getElementsByName("amount");
const cervejasAdicionadas = CarregaCervejas();

function CarregaCervejas() {
    let conectado = JSON.parse(localStorage.getItem("conectado"));

    if(conectado != null) {

        if(conectado.cervejas == null) {
            return new Array();
        }
        else 
        {
            return conectado.cervejas;
        }
    }

    return new Array();
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

function AddCerveja(id, nomeCerveja, preco) {
    const quantidade = Number(inputsAmounts[id].value);
    
    if(quantidade <= 0) {
        return;
    }

    const cerveja = {
        id: id,
        nomeCerveja: nomeCerveja,
        quantidade: quantidade,
        preco: Number(preco),
    }

    cervejasAdicionadas.push(cerveja);
    SalvaCervejas();
}

function SalvaCervejas() {
    let conectado = JSON.parse(localStorage.getItem("conectado"));
    
    if(conectado != null) {
        conectado.cervejas = cervejasAdicionadas;
        localStorage.setItem("conectado", JSON.stringify(conectado));

        let usuarios = JSON.parse(localStorage.getItem("usuario"));

        for(let i = 0; i < usuarios.length; i++) {
            const usuario = usuarios[i];
    
            // Usuário encontrado
            if(usuario.email == conectado.email) {
                usuarios[i] = conectado;
                localStorage.setItem("usuario", JSON.stringify(usuarios));
                break;
            }
        }
    }

}