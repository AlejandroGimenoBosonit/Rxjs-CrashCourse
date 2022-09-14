import { fromEvent, interval, switchMap } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

// create observables
const click$     = fromEvent( document, 'click' );
const interval$  = interval( 1000 );

// subscription

click$
.pipe(
    /*
    Any new subscription will finish the previous one
    */
    switchMap( ()=> interval$ )
    /*
    Any new subscription will be emitted at the same time of the previous one
    */
    // mergeMap( ()=> interval$ )
)
.subscribe( console.log )