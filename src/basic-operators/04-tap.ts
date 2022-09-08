import { range } from "rxjs";
import { map, tap} from 'rxjs/operators';
const numbers$ = range (7,1);

numbers$
.pipe(
    tap( x => {
        console.log('BEFORE: ', x);
        return x*1000000; // The return statement is ignored everytime
    }),

    map( value => value*10),
    
    tap({
        next: y => console.log("AFTER: ", y),
        error: err => console.log("SOMETHING IT'S WRONG!"),
        complete: () => console.log("That's all, folks!")
    })
)
.subscribe( final => console.log("Final Value:", final));