// Interval/Timer Exercise

import { interval, timer } from "rxjs";

const ms: number = 1000; // time value as milliseconds

const observer = {
    next: val => console.log('next: ', val),
    complete: () => console.log('complete')
};

console.log('Start');
const interval$ = interval(ms);
interval$.subscribe( observer );
console.log('End');

//////////////////////////////////////////////////////////////////

const timer$ = timer( ms );

console.log('Start');
timer$.subscribe( observer );
console.log('Fin');

// Init sequence every second AFTER the first 2 seconds

const timer2$ = timer( 2000, 1000 );

console.log('Start');
timer2$.subscribe( observer );
console.log('Fin');
/////////////////////////////////////////////////////////////////////////
// Programming timer to start at 5 seconds AFTER the actual time
const now = new Date();
now.setSeconds( now.getSeconds() + 5 )
const timer3$ = timer(now);

console.log('Start');
timer3$.subscribe( observer );
console.log('Fin');