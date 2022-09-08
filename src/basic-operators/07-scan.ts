import { from } from 'rxjs';
import { map, scan } from 'rxjs/operators';

const numbers = [1,2,3,4,5];

const totalReducer = ( acc: number, act: number ) => acc+act;

from(numbers)
.pipe(
    scan( totalReducer, 0 )
)
.subscribe(console.log)





interface User {
    id?: string;
    authenticated?: boolean;
    token?: string,
    age?: number;
}

const user: User[] = [
    { id: 'fher', authenticated: false, token: null},
    { id: 'fher', authenticated: true, token: 'ABC'},
    { id: 'fher', authenticated: true, token: 'ABC123'},
];


const state$ = from(user).pipe(
    scan<User>( (acc, cur)=> {
        return {...acc, ...cur}
    })
)

const id$ = state$.pipe(
    map(state => state.id)
)

id$.subscribe(console.log)