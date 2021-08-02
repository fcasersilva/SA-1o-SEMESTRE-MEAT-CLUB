const inputSenhaAntiga = document.getElementById("senhaAntiga");
const inputSenhaNova = document.getElementById("senhaNova");
const inputConfirmaSenhaNova = document.getElementById("confirmaSenhaNova");

function Atualizar() {
    const conectado = JSON.parse(localStorage.getItem("conectado"));

    if(conectado == null) {
        alert("Conecte em uma conta!");
        return;
    }

    if(inputSenhaAntiga.value == '' || inputSenhaNova.value == '' || inputConfirmaSenhaNova.value == '') {
        alert("Preencha todos os campos!");
        return;
    }

    if(conectado.senha != inputSenhaAntiga.value) {
        alert("A senha antiga está incorreto!");
        return;
    }

    if(inputSenhaNova.value != inputConfirmaSenhaNova.value) {
        alert("As senhas não conferem! \n Digite a senha novamente");
        return;
    }

    const senhaNova = inputSenhaNova.value;
    conectado.senha = senhaNova;
    localStorage.setItem("conectado", JSON.stringify(conectado));

    const usuarios = JSON.parse(localStorage.getItem("usuario"));

    for(let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];

        if(usuario.email == conectado.email) {
            usuarios[i].senha = senhaNova;
            localStorage.setItem("usuario", JSON.stringify(usuarios));
            break;
        }
    }

    inputSenhaAntiga.value = '';
    inputSenhaNova.value = '';
    inputConfirmaSenhaNova.value = '';
    alert("Senha alterada com sucesso!");
}

function ExcluirUser() {
    const usuarios = JSON.parse(localStorage.getItem("usuario"));
    const conectado = JSON.parse(localStorage.getItem("conectado"));

    for(let i = 0; i < usuarios.length; i++) {
        if(conectado.email == usuarios[i].email) {
            usuarios.splice(i, 1);
        }
    }

    localStorage.setItem("conectado", null);
    localStorage.setItem("usuarios", usuarios);
    alert("Conta excluida com sucesso!");
}