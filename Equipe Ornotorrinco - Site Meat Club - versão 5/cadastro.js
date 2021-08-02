const nomeUsuario = document.getElementById("nomeDeCadastro");
const cpfUsuario = document.getElementById("cpfDeCadastro");
const emailUsuario = document.getElementById("emailDeCadastro");
const senhaUsuario = document.getElementById("senhaDeCadastro");
const senhaConfirmadaCadastro = document.getElementById("senhaRepetida");
 
const keyUsuario = "usuario";

let usuariosCadastrados = ObtemUsuariosCadastrados() // localStorage.getItem("usuario");

// front end
function CadastrarPorElementos(){
    if(nomeUsuario.value == "" || cpfUsuario.value == "" || emailUsuario.value == "" || senhaUsuario.value == "" || senhaConfirmadaCadastro == ""){
        alert("Todos os campos são obrigatórios!")
        return
    } 

    let usuario = {
        // Pessoa
        nome: nomeUsuario.value,
        cpf: cpfUsuario.value,

        // Usuário
        email: emailUsuario.value,
        senha: senhaUsuario.value,
        senhaConfirmada: senhaConfirmadaCadastro.value
    }

    let emailExistente = VerificaEmailExistente(emailUsuario.value);
    if(emailExistente == true){
        alert("Já possui um cadastro com esse email!");
        return
    }

    let senhaConfirmada = ConfirmaSenha(usuario.senha, usuario.senhaConfirmada);
    if(senhaConfirmada == false) {
        alert(`As senhas não conferem!\n Digite a senha novamente`);
        return;
    }

    alert('Cadastro realizado!');
    Cadastrar(usuario.nome, usuario.cpf, usuario.email, usuario.senha);
    SalvarUsuarios();

    window.location.href = "telaLogin.html";
}

// Pura lógica
function Cadastrar(nome, cpf, email, senha) {
    let usuario = {
        // Pessoal
        nome: nome,
        cpf: cpf,

        // Usuário
        email: email,
        senha: senha,

        // Carrinho
        plano: null,
        cervejas: new Array(),

        // Histórico
        historicoPlano: new Array(),
        historicoCerveja: null
    }
    usuariosCadastrados.push(usuario)
    return usuario;
}

function SalvarUsuarios() {
    localStorage.setItem(keyUsuario, JSON.stringify(usuariosCadastrados))
}

function ObtemUsuariosCadastrados() {
    let usuario = JSON.parse(localStorage.getItem(keyUsuario))
    if(usuario == null){
        return new Array()
    }
    return usuario
}

function VerificaEmailExistente(emailInputValue) {
    let usuariosCadastrados = ObtemUsuariosCadastrados()
    for(i = 0; i < usuariosCadastrados.length; i++) {
        const usuario = usuariosCadastrados[i];
        if(usuario.email == emailInputValue) {
            return true
        }
    }

    return false
}
function ConfirmaSenha(senha, senhaConfirmada){
    return senha === senhaConfirmada
}

function PularCadastro() {
    window.location.href = "telaLogin.html"
}