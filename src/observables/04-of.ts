import { of } from "rxjs";

// const observer$ = of(1,2,3,4,5,6);
// We also could send to it an array's content as a parameter
const observer$ = of<number[]>(...[1,2,3,4,5,6,7]);
// A bit more complicated...
// const observer$ = of<any>( [1,2], {a:1, b:2}, function(){return 'Hi';}, true, Promise.resolve(true) );

observer$.subscribe({
    next:       value => console.log('next: ', value),
    error:      error => console.warn( 'error: ', error ),
    complete:   () => console.info('Completed')
})