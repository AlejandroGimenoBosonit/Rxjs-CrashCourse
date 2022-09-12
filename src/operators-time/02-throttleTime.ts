import { throttleTime, fromEvent, map, pluck, asyncScheduler } from 'rxjs';

// Ej 1
const click$ = fromEvent( document, 'click' );

click$.pipe(
    throttleTime( 3000 )
)
// .subscribe( console.log );
// log printed every 3 seconds


// Ej 2
//create input element
const input = document.createElement('input');
// append input to the html body
document.querySelector('body').append( input );

// create observable to detect every new text entry 
const input$ = fromEvent( input, 'keyup' );

input$
.pipe(
    throttleTime( 
        // duration toevery output emission
        1000,
        // scheduler
        asyncScheduler,
        // to emit the first and last element
        {
            leading: false,// we can specify to emi the first element
            trailing: true // To obtain the entire query (final element)
        }
    ),
    map( event => {
        console.log('+1 second passed');
        return event.target['value']
    } )
)
.subscribe(console.log)