
let deck = [];
const tipos = ['C','D', 'H','S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntoscompu   = 0;

//Referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const puntajeJugadores = document.querySelectorAll('small');
const cartaJugadorHtml = document.querySelector('#jugador-cartas');
const cartaCompuHtml = document.querySelector('#computadora-cartas');

const crearDeck  = () => {

    for (let i = 2; i <= 10; i++) {
        for (const tipo of tipos) {
            deck.push( i + tipo);
        }
    }

    for (const tipo of tipos) {
        for (const esp of especiales) {
            deck.push(esp + tipo);   
        }
    }
   
    deck = _.shuffle(deck);
    return deck;
}

crearDeck();
 console.log(deck);

const pedirCarta = () => {

   if (deck.length === 0) {
        throw 'No hay cartas en el Deck';
   }
    const carta = deck.shift();
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length - 1);
    return isNaN(valor) ? 
                (valor === 'A') ? 11 : 10
                : parseInt(valor);
}


const turnoComputadora = (puntajeMinimo) => {
    
    do {
        const carta = pedirCarta();
        puntoscompu = puntoscompu + valorCarta(carta);
        puntajeJugadores[1].innerText = puntoscompu;
        const cartaHtml = document.createElement('img');
        cartaHtml.src = `./assets/cartas/${carta}.png`;
        cartaHtml.className = 'carta';
        cartaCompuHtml.append(cartaHtml);

        if(puntajeMinimo === 21){
            break;
        }

    } while ((puntoscompu < puntajeMinimo) && (puntajeMinimo <= 21));


    setTimeout(() => {
        if(puntoscompu > puntajeMinimo  || puntajeMinimo > 21 ){
            alert('Computadora Gana');
        }else if (puntoscompu < puntajeMinimo ){
            alert('Jugador Gana');
            
        }else{
            alert('Ninguno Gano');
        }   
    }, 25);
}

//Eventos
btnPedir.addEventListener('click', ()=> {
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        puntajeJugadores[0].innerText = puntosJugador;
        const cartaHtml = document.createElement('img');
        cartaHtml.src = `./assets/cartas/${carta}.png`;
        cartaHtml.className = 'carta';
        cartaJugadorHtml.append(cartaHtml);

        if (puntosJugador > 21){
           
            //console.warn('perdiste buddy');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }else if(puntosJugador === 21){
         
            //console.warn('Ganaste Buddy');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click' , ()=> {
    deck = [];
    crearDeck();
    puntosJugador = 0;
    puntoscompu = 0;
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    puntajeJugadores[0].innerText = '0';
    puntajeJugadores[1].innerText =  '0';
    cartaCompuHtml.innerHTML = '';
    cartaJugadorHtml.innerHTML = '';




});



