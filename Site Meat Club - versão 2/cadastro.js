
const nomeUsuario = document.getElementById("nomeDeCadastro");
const cpfUsuario = document.getElementById("cpfDeCadastro");
const enderecoUsuario = document.getElementById("enderecoDeCadastro");
const cepUsuario = document.getElementById("cepCadastro");
const emailUsuario = document.getElementById("emailDeCadastro");
const senhaUsuario = document.getElementById("senhaDeCadastro");
const senhaConfirmadaCadastro = document.getElementById("senhaRepetida");

const keyUsuario = "usuario";

let usuariosCadastrados = ObtemUsuariosCadastrados() // localStorage.getItem("usuario");

// front end
function CadastrarPorElementos(){
    if(nomeUsuario.value == "" || cpfUsuario.value == "" || enderecoUsuario.value == "" || cepUsuario.value == "" || emailUsuario.value == "" || senhaUsuario.value == "" || senhaConfirmadaCadastro == ""){
        alert("Todos os campos são obrigatórios!")
        return
    } 
    let usuario = {
        // Pessoa
        nome: nomeUsuario.value,
        cpf: cpfUsuario.value,
        // Endereço
        endereco: enderecoUsuario.value,
        cep: cepUsuario.value,

        // Usuário
        email: emailUsuario.value,
        senha: senhaUsuario.value,
        senhaConfirmada: senhaConfirmadaCadastro.value
    }

    let emailExistente = VerificaEmailExistente()
    if(emailExistente == true){
        alert("Já possui um cadastro com esse email!")
        return
    }

    let senhaConfirmada = ConfirmaSenha(usuario.senha, usuario.senhaConfirmada);
    if(senhaConfirmada == false) {
        alert(`As senhas não conferem!\nDigite a senha novamente`)
        return;
    }

    alert('Cadastro realizado!')
    Cadastrar(usuario.nome, usuario.cpf, usuario.endereco, usuario.cep, usuario.email, usuario.senha);
    SalvarUsuarios();
    window.location.href="CRUD-usuarios.html"
}

// Pura lógica - backend
function Cadastrar(nome, cpf, endereco, cep, email, senha) {
    // TESTE
    let usuario = {
        nome: nome,
        cpf: cpf,
        endereco: endereco,
        cep: cep,
        email: email,
        senha: senha
    }
    usuariosCadastrados.push(usuario)
    return usuario;
}

function SalvarUsuarios() {
    localStorage.setItem(keyUsuario, JSON.stringify(usuariosCadastrados))
}

function ObtemUsuariosCadastrados(){
    let usuario = JSON.parse(localStorage.getItem(keyUsuario))
    if(usuario == null){
        return new Array()
    }
    return usuario
}

function VerificaEmailExistente(email, emailInput){
    let usuariosCadastrados = ObtemUsuariosCadastrados()
    for(i = 0; i < usuariosCadastrados.length; i++){
        let usuario = usuariosCadastrados[i]
        if(usuario.email == emailUsuario.value){
            return true
        }
    }
    return false
}
function ConfirmaSenha(senha, senhaConfirmada){
    return senha === senhaConfirmada
}

function PularCadastro(){
    window.location.href="tela-de-login-SA.html"
}