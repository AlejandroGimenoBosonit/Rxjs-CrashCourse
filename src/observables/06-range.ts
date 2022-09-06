// Range exercise
import { asyncScheduler, observeOn, of, range } from 'rxjs';

// Instead of using an observableusing the method 'of' to intense processes
const version1$ = of(1,2,3,4,5,6,7,8,9);
// version1$.subscribe(console.log); // 1,2,3,4,5,6,7,8,9 ...

// synchronous
console.log('Start');
const version2$ = range(
    1, // from: 1
    9 // emit 9 EMISSIONS (not the final point instead)
);
version2$.subscribe(console.log) // 1, 2, 3, 4, 5, 6, 7, 8, 9
console.log('End');



console.log('Start');
const version3$ = range(
    -5, // from: -5
    10 // emit 10 EMISSIONS (not the final point instead)
);
version3$.subscribe(console.log)// -5, -4, -3, -2, -1, 0, 1, 2, 3, 4
console.log('End');


const version4$ = range(5); // 5 amissions because the start default's value is 0
version4$.subscribe(console.log) // 0,1,2,3,4



// How to transform our observable into an asynchronous observable
console.log('Start');
// const version75$ = range( 1, 5, asyncScheduler );// DEPRECATED
const version5$ = range( 1, 5);
version5$
    .pipe(
        observeOn( asyncScheduler )
    )
    .subscribe(console.log)    
console.log('End');
/*

Async Outputs:
'Start'
'End'
0
1
2
3
4

*/