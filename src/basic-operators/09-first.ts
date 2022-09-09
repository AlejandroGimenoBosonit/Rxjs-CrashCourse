import { fromEvent } from 'rxjs';
import { first, tap, map } from 'rxjs/operators';

const click$ = fromEvent<MouseEvent>( document, 'click' );

click$
.pipe(
    tap(console.log),
    first( event => event.clientY >= 150 )
)
.subscribe({
    next: value => console.log(value),
    complete: ()=> console.log('Complete')
})