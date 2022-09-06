// fromEvent exercise
import { fromEvent } from 'rxjs';

/*

DOM Events

*/

const src1$ = fromEvent<MouseEvent>(
    // target: The entire html document
    document,
    // eventName: when user make a mouse's 'click'
    'click'
);
const src2$ = fromEvent<KeyboardEvent>(
    // target: The entire html document
    document,
    // eventName: when user press up a key
    'keyup'
);

// create a simple observer
const observer = {
    next: val => console.log('Value: ', val)
};

// subscription to the observable by observer
src1$.subscribe( observer );

// subscription to the observable to extract the pointer's coordinates
src1$.subscribe(({x, y})=>{
    console.log(`Pointer Coordinates -> x: ${x}, y: ${y}`);
})

// subscription to the observable to print the key that we pressed.
src2$.subscribe( event => {
    console.log('Key pressed: ', event.key)
});
