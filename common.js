//inputs do cadastro
let nomeCadastrado = document.getElementById("nomeDeCadastro")
let enderecoCadastrado = document.getElementById("enderecoDeCadastro")
let emailCadastrado = document.getElementById("emailDeCadastro")
let senhaCadastrada = document.getElementById("senhaDeCadastro")
let senhaConfirmada = document.getElementById("senhaRepetida")

//inputs do login
let emailSalvo = document.getElementById("nomeLogin")
let senhaSalva = document.getElementById("senhaLogin")

//inputs da pesquisa 
let usuarioPesquisado;
let enderecoPesquisado;
let emailPesquisado;
let senhaPesquisada;

//input excluir usuario
let excluirUsuario = document.getElementById("excluir")

//posição i na pesquisa
let posicaoPesquisa = document.getElementById("userPesquisado")

//Arrays para armazenamento de dados
let arrayNomes = []
let arrayEndereco = []
let arrayEmail = []
let arraySenhas = []

const KEY_NOME = "nome";
const KEY_ENDERECO = "endereco";
const KEY_EMAIL = "email";
const KEY_SENHAS = "senha";

function Cadastrar () {

    pegaDoLocalStorage()
    
    if(validaSenha() == true){
        if (arrayNomes == null){

            arrayNomes = []
            arrayEndereco = []
            arrayEmail = []
            arraySenhas = []
        
            ArrayPush()
     
            mandaProLocalStorage()

        } else {
          
            ArrayPush()
        
            mandaProLocalStorage()

        }

        alert ("Cadastro realizado")

        window.location.href="./CRUD-usuarios.html"
    }
}

function Logar() {

    arrayEmail = JSON.parse(localStorage.getItem("email"))
    arraySenhas = JSON.parse(localStorage.getItem("senha"))

    let logar = 0

    for(i=0; i < arrayEmail.length ; i++){

        // Se o nome e senha no input do login forem iguais ao nome e senha da vez no loop
        if(emailSalvo.value == arrayEmail[i] && senhaSalva.value == arraySenhas[i]){
          // Flag "logar" ativa	
	       logar = 1
        }    
    }

    if (logar == 1){
        alert ("Login efetuado")
        window.location.href="./CRUD-usuarios.html"    

    }else{
        alert ("Usuário ou Senha inválidos")
    }
}

function Listar(){

    pegaDoLocalStorage()

    //String para armazenar a lista
    let lista = ''

    //verifica quantidade de cadastros
    for(i=0; i < arrayNomes.length; i++){
      // Armazena na variável lista, os dados dos vetores 
      lista= `${arrayNomes[i]} - ${arrayEndereco[i]} - ${arrayEmail[i]} - ${arraySenhas[i]}<br>`

    }
    // Mostra a lista na div centro
    document.getElementById("embaixo").innerHTML = lista
}

function Pesquisar(){

    pegaDoLocalStorage()

    let encontrou = 0

    //verifica o tamanho dos arrays
    for(i=0; i < arrayNomes.length; i++){

      // Compara o valor do input de pesquisa com o valor da posição do array
      if(nomePesquisado.value == arrayNomes[i]){
        
        encontrou = 1
        posicaoPesquisar = i
      
      }
    }

    if (encontrou == 1){

        // Pega os valores da posição onde foi encontrado e joga pra os inputs
        document.getElementById("nomePesquisado").value = arrayNomes[posicaoPesquisar]
        document.getElementById("enderecoPesquisado").value = arrayEndereco[posicaoPesquisar]
        document.getElementById("emailPesquisado").value = arrayEmail[posicaoPesquisar]
        document.getElementById("senhaPesquisada").value = arraySenhas[posicaoPesquisar] 

    }else{

        // Mostra mensagem de usuário inexistente
        alert("Usuário não encontrado!")
        // Limpa dados do input excluir
        document.getElementById("nomePequisado").value = ''

    } 
}

function Atualizar(){

    PegarInputs()
    // Remove os dados da posição encontrada e joga os novos dados
    arrayNomes.splice(posicaoPesquisar, 1, nomePesquisado.value)
    arrayEndereco.splice(posicaoPesquisar, 1, enderecoPesquisado.value)
    arraySenhas.splice(posicaoPesquisar, 1, senhaPesquisada.value)
    arrayEmail.splice(posicaoPesquisar, 1, emailPesquisado.value)
      
    mandaProLocalStorage()

    alert("Dados atualizados!")

}

function Excluir(){

    pegaDoLocalStorage()

    // Cria uma variável para armazenar a posição dos dados a serem excluídos 
    let posicaoExcluir

    // Realiza um loop do tamanho dos vetores
    for(i=0; i < arrayNomes.length; i++){

        // Compara o valor do input de exclusão com o valor da posição atual do vetor
        if(excluirUsuario.value == arrayNomes[i]){

        // Se existir um valor igual, armazena a posição
        posicaoExcluir = i

        // Utiliza a posição armazenada para excluir os dados
        arrayNomes.splice(posicaoExcluir, 1)
        arrayEndereco.splice(posicaoExcluir, 1)
        arrayEmail.splice(posicaoExcluir, 1)
        arraySenhas.splice(posicaoExcluir, 1)
        
        // Mostra mensagem de dados excluídos
        alert("Usuário excluído!")

        mandaProLocalStorage()

        }
    }
    //limpa input
    document.getElementById("excluir").value = ''
}

function validaSenha(){
    
    let senhaInserida = document.getElementById("senhaDeCadastro")
    let senhaValidada = document.getElementById("senhaRepetida")

    if(senhaInserida.value == senhaValidada.value){
        
        return true
    } else{

        alert(`As senhas digitadas estão diferentes!\nDigite novamente.`)
        return false
    }
}

function PegarInputs(){
    usuarioPesquisado = document.getElementById("nomePesquisado")
    enderecoPesquisado = document.getElementById("enderecoPesquisado")
    emailPesquisado = document.getElementById("emailPesquisado")
    senhaPesquisada = document.getElementById("senhaPesquisada")
}

function pegaDoLocalStorage(){
    arrayNomes = JSON.parse(localStorage.getItem("nome"))
    arrayEndereco = JSON.parse(localStorage.getItem("endereço"))
    arrayEmail = JSON.parse(localStorage.getItem("email"))
    arraySenhas = JSON.parse(localStorage.getItem("senha"))
}

function mandaProLocalStorage(){
    localStorage.setItem(KEY_NOME, JSON.stringify(arrayNomes))
    localStorage.setItem(KEY_ENDERECO, JSON.stringify(arrayEndereco))
    localStorage.setItem(KEY_EMAIL, JSON.stringify(arrayEmail)) 
    localStorage.setItem(KEY_SENHAS, JSON.stringify(arraySenhas))
}

function ArrayPush() {
    arrayNomes.push(nomeCadastrado.value) 
    arrayEndereco.push(enderecoCadastrado.value)
    arrayEmail.push(emailCadastrado.value)
    arraySenhas.push(senhaCadastrada.value)
}

function JaCadastrado (){
    window.location.href = "tela-de-login-SA.html"
}

function NaoCadastrado (){
    window.location.href = "tela-de-cadastro-SA.html"
}