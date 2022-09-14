import { mergeMap, of, interval, map, take, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const words$ = of('a', 'b', 'c');

words$
.pipe(
    mergeMap( word => interval(1000).pipe(
        map( index => `${word}, ${index}` ),
        take(3)
    ) )
)
// .subscribe({
//     next: value => console.log('Value: ', value),
//     complete: ()=> console.log('Comlete')
// })




// mouse click exercise
const mouseDown$ = fromEvent( document, 'mousedown' );
const mouseUp$   = fromEvent( document, 'mouseup' );
const interval$  = interval(1);

 mouseDown$
 .pipe(
    // emit interval's values until mouseup is subscribed
    mergeMap( ()=> interval$.pipe( takeUntil( mouseUp$ ) ) )
 )
 .subscribe( console.log );