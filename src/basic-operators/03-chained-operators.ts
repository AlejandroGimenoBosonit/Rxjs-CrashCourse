import { fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';

/*
Example where we want to filter all our keyboard event in the page
and print by console ONLY when we press 'Enter'
*/
const observable$ = fromEvent<KeyboardEvent>( document, 'keyup');
        
observable$.pipe(

    map( event => event.code ),
    filter( key => key === 'Enter' )
    
)
.subscribe(console.log)