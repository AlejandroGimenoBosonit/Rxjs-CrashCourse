import { interval, fromEvent } from 'rxjs';
import { sample } from 'rxjs/operators';

// observables
const interval$ = interval(100);
const click$ = fromEvent( document, 'click' );


// subscribe to the number emissions observable every time the click observable emits an event
interval$
.pipe(
    sample( click$ )
)
.subscribe(console.log)