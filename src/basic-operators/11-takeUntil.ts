
import { interval, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// create html button
const button = document.createElement('button');
button.innerHTML = 'Stop Timer';
document.querySelector('body').append(button);


// counter - observable
const counter$ = interval(1000);
const clieckBtn = fromEvent(button, 'click');

// subscription
counter$
.pipe(
    takeUntil( clieckBtn )
)
.subscribe({
    next: value => console.log('Next: ', value),
    complete: ()=> console.log('Complete')
})