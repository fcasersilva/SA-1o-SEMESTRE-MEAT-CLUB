function cadastraCerveja(idCerveja, tipoCerveja, quantidade, preco){
    const cerveja = {
        id: idCerveja,
        tipo: tipoCerveja,
        quantidade: quantidade,
        preco: preco
    }
}



function GetID() {
    let id = 1000;
    let produto = produtos.find(item => item.id == id);

    while(produto != null) {
        ++id;
        produto = produtos.find(item => item.id == id);
    }

    return id;
}

function AddBeer (id, quantidade) {
    
}