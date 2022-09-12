import { fromEvent } from 'rxjs';
import { map, sampleTime } from 'rxjs/operators';

// event to look for a mouse event
const click$ = fromEvent<MouseEvent>( document, 'click' );

click$
.pipe(
    sampleTime( 2000 ), // wait X seconds
    map( ({x, y})=> ({x, y}) )// map every event every X secons
)
.subscribe(console.log);