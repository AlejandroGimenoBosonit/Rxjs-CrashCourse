// Basic Operators - map - Exercise
import { range, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

// To deal with operators we need firstan observable to aplly to them:
const observable$ = range(1,5)
/*
In this case the observable 'range' will emit 5 emissions from 1 as starter value.

BUT if We want to take these values and modify them to emit from 10 to 50 We can use this
operator.
*/
observable$.pipe(
    map( value => value * 10 )
)

// subscription
.subscribe( console.log );

//////////////////////////////////////////////////////////////////////////////
const observable2$ = range(1,5);

observable2$.pipe(

    // Using stricted typped <(value that will be recieved), (value that will be emitted)>
    map<number, number>( value => {
        return value * 10;
    })
)

// subscription
.subscribe( console.log );

//////////////////////////////////////////////////////////////////////////////
const observable3$ = range(1,5);

observable3$.pipe(

    // Using stricted typped <(value that will be recieved), (value that will be emitted)>
    map<number, string>( value => {
        return (value * 10).toString();
    })
)

// subscription
.subscribe( console.log );

//////////////////////////////////////////////////////////////////////////////
// Observable that stays for the DOM and emit the key that it's pressed
const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup');

const keyUpCode$ = keyup$
.pipe( map( value => value.code ) )


keyUpCode$.subscribe( code => console.log('map, ', code) )




