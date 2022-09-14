import { interval, fromEvent } from 'rxjs';
import { take, switchMap, concatMap } from 'rxjs/operators';

const interval$ = interval(500).pipe( take(3) );
const click$    = fromEvent( document, 'click' );

// subscription
click$
.pipe(
    concatMap( ()=> interval$ )
)
.subscribe( console.log );