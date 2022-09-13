import { ajax } from 'rxjs/ajax';

const url: string = "https://httpbin.org/delay/1";

const observable$ = ajax.getJSON( url, {
    'Content-Type':'application/json',
    'mt-token':'ABC123'
});

observable$.subscribe( response => console.log('Data: ', response) )