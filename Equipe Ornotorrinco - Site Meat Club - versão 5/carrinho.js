const container = document.getElementById("container");
const totalParagrafo = document.getElementById("total");
let total = 0;

function CarregaCarrinho() {
    let conectado = JSON.parse(localStorage.getItem("conectado"));

    if(conectado != null) {

        if(conectado.cervejas.length <= 0 && conectado.plano == null) return;

        CriaProdutos();
        totalParagrafo.innerText = `Total R$: ${total}`;
    }
}

function CarregaCervejas() {
    let conectado = JSON.parse(localStorage.getItem("conectado"));

    if(conectado != null) {
        let cervejas = conectado.cervejas;
        
        if(cervejas == null) {
            return new Array();
        }

        return cervejas;
    } 

    return new Array();
}

function CriaProdutos() {
    container.innerText = '';
    total = 0;

    let conectado = JSON.parse(localStorage.getItem("conectado"));
    if(conectado == null) return;

    // Cria plano
    
    const assinatura = conectado.plano;
    if(assinatura != null) {
        CriaProduto(assinatura.plano, 1, assinatura.precoAoMes);
        total = Number(total) + Number(assinatura.precoAoMes);
    }

    // Cria cervejas
    const cervejas = CarregaCervejas();

    for(let i = 0; i < cervejas.length; i++) {
        const cerveja = cervejas[i];
        total = Number(total) + Number(cerveja.preco) * Number(cerveja.quantidade);
        CriaProduto(cerveja.nomeCerveja, cerveja.quantidade, cerveja.preco);
    }
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

function Pagar() {
    container.innerText = '';
    totalParagrafo.innerText = "Total R$: 0.00";
    const conectado = JSON.parse(localStorage.getItem("conectado"));

    if(conectado != null) {
        //conectado.historicoPlano.push(conectado.plano);

        if(conectado.plano == null) return;

        // Registra plano
        if(conectado.historicoPlano == null) {
            conectado.historicoPlano = [conectado.plano];
        }
        else {
            conectado.historicoPlano.push(conectado.plano);   
        }

        // Registra cervejas
        if(conectado.historicoCerveja == null || conectado.historicoCerveja.length <= 0) {
            
            conectado.historicoCerveja = new Array(conectado.cervejas);
        }
        else {
            console.log("Else");
            let cervejasArray = [];

            for(let i = 0; i < conectado.cervejas.length; i++) {
                cervejasArray.push(conectado.cervejas[i]);
                //conectado.historicoCerveja.push(new Array(conectado.cervejas[i]));
            }

            conectado.historicoCerveja.push(cervejasArray);
        }

        // Tira plano e cervejas do carrinho
        conectado.plano = null;
        conectado.cervejas = new Array();

        // Salva no conectado
        localStorage.setItem("conectado", JSON.stringify(conectado));

        // Salva no usuário
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

        alert("Compra realizada com sucesso!");
    }
}