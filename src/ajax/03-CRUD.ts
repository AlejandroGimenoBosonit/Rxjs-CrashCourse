import { ajax, AjaxResponse } from 'rxjs/ajax';

const url:string = 'https://httpbin.org/delay/1';

// get request
ajax
.get(url, {
    'Content-Type':'application/json',
    'my-token':'ABC123'
})
.subscribe( (response) => console.log( response ) );

// post request
ajax
.post(
    url, // path
    {
        id: 1,   // body
        name: 'John'
    }, 
    {
    'my-token':'ABC123' // header
})
.subscribe( (response) => console.log( response ) );

// put request
ajax
.put(
    url, // path
    {
        id: 1,   // body
        name: 'John'
    }, 
    {
    'my-token':'ABC123' // header
})
.subscribe( (response) => console.log( response ) );

// delete rquest
ajax
.delete(
    url, // path
    {
        'my-token':'ABC123' // header
    }
)
.subscribe( (response) => console.log( response ) )


// ANALOG way
ajax({
    url: url,
    method: 'POST', // We can change our method typing the correct order
    headers: {
        'my-token': 'ABC123'
    },
    body: {
        id: 2,
        name: 'Jane' 
    }
})
.subscribe(console.log);