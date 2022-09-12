import { fromEvent } from 'rxjs';
import { auditTime, tap, map } from 'rxjs/operators';

const clicl$ = fromEvent<MouseEvent>( document, 'click' );

clicl$
.pipe(
    map( ({x}) => x ),
    tap( value => console.log('tap', value) ),
    auditTime(2000)
)
.subscribe( console.log)
/*
Value printes: Last registered Value by the auditTime operator that comes from the click event
*/