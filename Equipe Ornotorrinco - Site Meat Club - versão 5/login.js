const emailLogin = document.getElementById("emailLogin")
const senhaLogin = document.getElementById("senhaLogin")

const keyUsuario = "usuario"

function Logar() {
    let usuariosCadastrados = ObtemUsuariosCadastrados()
    for(i = 0; i < usuariosCadastrados.length; i++){
        const usuario = usuariosCadastrados[i];

        if(usuario.email == emailLogin.value && usuario.senha == senhaLogin.value) {
            localStorage.setItem("conectado", JSON.stringify(usuario));
            alert("Usuário conectado com sucesso!");
            window.location.href = "meatClubLogado.html"
            return;
        }
    }

    alert("Email ou senha incorretos!")
}

function ObtemUsuariosCadastrados(){
    let usuario = JSON.parse(localStorage.getItem(keyUsuario))
    if(usuario == null){
        return new Array()
    }
    return usuario
}

function NaoCadastrado(){
    window.location.href="telaCadastro.html"
}