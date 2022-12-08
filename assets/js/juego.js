const miModulo = (()=> {
    'use-strict'
    let deck = [];
    const tipos      = ['C','D', 'H','S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];
    let puntosJugador = 0;

//Referencias HTML
const btnPedir = document.querySelector('#btnPedir'),
      btnDetener = document.querySelector('#btnDetener'),
      btnNuevo = document.querySelector('#btnNuevo'),
      puntajeJugadores = document.querySelectorAll('small'),
      divCartasJugadores = document.querySelectorAll('.divCartas');
    //   cartaJugadorHtml = document.querySelector('#jugador-cartas'),
    //   cartaCompuHtml = document.querySelector('#computadora-cartas');

const initGame = (numJugadores = 2) => {
    deck = crearDeck();
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
        puntosJugadores.push(0);
    }

    puntajeJugadores.forEach( elem => elem.innerText = '0');
    divCartasJugadores.forEach(elem => elem.innerHTML = '');
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    console.log({puntosJugadores});
}

const crearDeck  = () => {
    deck = [];
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
    return _.shuffle(deck);
}

const pedirCarta = () => {
   if (deck.length === 0) {
        throw 'No hay cartas en el Deck';
   }
   return deck.shift();
}

const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length - 1);
    return isNaN(valor) ? 
                (valor === 'A') ? 11 : 10
                : parseInt(valor);
}

// Turno: 0 = primer jugador .... ultimo jugador es la computadora
const acumularPuntos = ( carta, turno ) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntajeJugadores[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
}

const crearCarta = ( carta, turno ) => {
      const cartaHtml = document.createElement('img');
      cartaHtml.src = `./assets/cartas/${carta}.png`;
      cartaHtml.className = 'carta';
      divCartasJugadores[turno].append(cartaHtml);
}

const determinarGanador = () => {

    const [puntoscompu, puntajeMinimo] = puntosJugadores;
    setTimeout(() => {
        if(puntoscompu > puntajeMinimo  || puntajeMinimo > 21 ){
            alert('Computadora Gana');
        }else if (puntoscompu < puntajeMinimo ){
            alert('Jugador Gana');
            
        }else{
            alert('Ninguno Gano');
        }   
    }, 100);
}

const turnoComputadora = (puntajeMinimo) => {
    let puntoscompu = 0;
    do {
        const carta = pedirCarta();
        puntoscompu = acumularPuntos(carta, puntosJugadores.length - 1);
        crearCarta(carta, puntosJugadores.length - 1);
        
    } while ((puntoscompu < puntajeMinimo) && (puntajeMinimo <= 21));

    determinarGanador();
    
}

//Eventos
btnPedir.addEventListener('click', ()=> {
        const carta = pedirCarta();
        puntosJugador = acumularPuntos(carta,0);
        
        crearCarta(carta,0 );

        if (puntosJugador > 21){
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
    initGame();
});

// Lo que retorne va ser lo unico publico todo lo demas sera privado
return {
    // La primera parte es para colocar como quiero que se llame el metodo al publico
    nuevoJuego: initGame
};

})();








