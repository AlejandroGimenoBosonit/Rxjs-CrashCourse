import { of } from 'rxjs';
import { take, tap } from 'rxjs/operators';


// We need and observalble
const numbers$ = of(1,2,3,4,5);

numbers$.pipe(
    tap( t => console.log('tap', t) ),
    take(2)
)

.subscribe({
    next: value => console.log( value ),
    complete: ()=> console.log('Complete')
});