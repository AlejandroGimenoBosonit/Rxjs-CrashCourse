import { fromEvent, debounceTime, map } from 'rxjs';
import { ajax } from 'rxjs/ajax';

// References
const body      = document.querySelector('body');
const textInput = document.createElement('input');
const orderList = document.createElement('ol');

body.append( textInput, orderList );


// Streams
const input$ = fromEvent( textInput, 'keyup' );
const url : string = 

input$
.pipe(
    debounceTime( 500 ),
    map( event => ajax.getJSON( `https://api.github.com/search/users?q=${event.target['value']}` ))
)
.subscribe( response => {
    // returned an observable
    response
    .pipe(
        map( response => response['url'] )
    )
    .subscribe( console.log )
})

