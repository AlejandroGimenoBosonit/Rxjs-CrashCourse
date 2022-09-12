import { debounceTime, fromEvent, map, pluck } from "rxjs";

// Ej 1
const click$ = fromEvent( document, 'click' );

click$.pipe(
    debounceTime( 1000 )
)
.subscribe( console.log );
// log printed after 1000 ms


// Ej 2
//create input element
const input = document.createElement('input');
// append input to the html body
document.querySelector('body').append( input );

// create observable to detect every new text entry 
const input$ = fromEvent( input, 'keyup' );

input$
.pipe(
    debounceTime( 1000 ),
    map( event => event.target['value'] )
)
.subscribe(console.log)