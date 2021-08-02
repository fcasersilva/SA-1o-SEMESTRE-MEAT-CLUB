function Sair() {
    const conectado = JSON.parse(localStorage.getItem("conectado"));

    if(conectado != null) {
        localStorage.setItem("conectado", null);
        window.location.href = "meatClub.html";
    }
}