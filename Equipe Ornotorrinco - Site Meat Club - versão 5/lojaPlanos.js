const planos = [
    {plano: "Meat Basic", descricao: "Começando o fogo", message: "1,5kg (2 a 3 pessoas)", 
    itens: ["Lagarto", "Fraldinha", "Linguiça toscana", "Coração de frango"], precoAoMes: 125},

    {plano: "Meat Medium", descricao: "Churrasqueiro(a) iniciante", message: "2kg (4 a 5 pessoas)",
    itens: ["Maminha", "Alcatra", "Tulipa", "Bife ancho"], precoAoMes: 165},

    {plano: "Meat Pro", descricao: "Churrasqueiro(a) confiante", message: "3kg (6 a 8 pessoas)",
    itens: ["Picanha", "Codorna", "Chorizo", "Costela em tiras"], precoAoMes: 190},

    {plano: "Meat Premium", descricao: "Assador(a) oficial da galera", message: "5kg (10 a 12 pessoas)",
    itens: ["Paleta de javali", "Carré de cordeiro", "Costela de Wagyu", "Tomahawk"], precoAoMes: 250}
];


function AdicionarPlano(planoId) {

    let conectado = JSON.parse(localStorage.getItem("conectado"));

    if(conectado == null) return;

    conectado.plano = ObtemPlano(planoId);
    localStorage.setItem("conectado", JSON.stringify(conectado));

    // Atualiza localStorage dos usuários.
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

function ObtemPlano(planoId) {
    let id = Number(planoId);
    if(id >= planos.length) {
        console.log("O id é maior que os planos existentes!");
        return null;
    }

    return planos[planoId];
}