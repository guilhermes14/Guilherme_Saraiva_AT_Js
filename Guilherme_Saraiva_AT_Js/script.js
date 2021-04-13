const cartasDoTabuleiro = document.querySelectorAll('.carta');
cartasDoTabuleiro.forEach(i => i.addEventListener('click', viraCarta));
let cartaVirada = false;
let travaAsCartas = false;
let cartaInicial;
let cartaFinal;
var pontuacao = 0;
var segundos = 0;

function iniciarJogo(){
    console.log("iniciou")

    var cartas = document.getElementById('jogo');
    cartas.style.pointerEvents = "all";

    temporizador()

}

function temporizador(){

    var tempo = document.getElementById("tempoJogo");

    window.setInterval(function(){
        
        tempo.innerHTML = segundos;
        segundos++;

    },1000);

}

function viraCarta(){

    if (travaAsCartas) return;

    if(this==cartaInicial) return;

    this.classList.add('virar');
    
    if(!cartaVirada){
        cartaVirada = true;
        cartaInicial = this;

        return;
    }
    cartaFinal = this;

    comparaCartas()
}

function comparaCartas(){

    if(cartaInicial.dataset.framework === cartaFinal.dataset.framework){
        cartaInicial.removeEventListener('click', viraCarta);
        cartaFinal.removeEventListener('click', viraCarta);

        recompoeJogo();

        pontuacao += 1;
        console.log(pontuacao)

        if (pontuacao === 8){
            window.alert(" Você terminou em " + segundos + " segundos!\n Parabéns!");

            location.reload();
        }

    }else{

        travaAsCartas = true;
        setTimeout(() => {
            cartaInicial.classList.remove('virar');
            cartaFinal.classList.remove('virar');
            recompoeJogo();
            
        }, 1500);
    }

}

function recompoeJogo(){

    [cartaVirada,travaAsCartas]=[false,false];
    [cartaInicial,cartaFinal]=[null,null];

}

(function embaralhaCarta(){

    cartasDoTabuleiro.forEach(i => {
        let embaralha = Math.floor(Math.random()*12);
        i.style.order = embaralha;
    });

})();



