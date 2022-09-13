import { ajax, AjaxError } from 'rxjs/ajax';
import { map, catchError, of } from 'rxjs';


// api calling
const url = 'https://api.githgub.com/users?per_page=5';

// request using fetch API
// const fetchPromise = fetch( url );

/////////////////////////////////////////////////////////////////////
// Error managing
// const errorManaging = ( response: Response ) => {
//     if( !response.ok ) throw new Error( response.statusText );

//     return response;
// };
/////////////////////////////////////////////////////////////////////

// get information
// fetchPromise
// .then( errorManaging )
// .then( response => response.json() )
// .then( data => console.log( 'data: ', data ) )
// .catch( error => console.warn( 'error in users: ', error ) )

const catchErrorMethod = (error: AjaxError ) => {
    console.warn( 'ERROR: ', error.message );
    return of([]); //returning an observable with no information
}
// using ajax
ajax( url )
.pipe(
    map( response => response.response ),
    // catching errors
    catchError( catchErrorMethod )
)
.subscribe( users => console.log('Users: ', users) )