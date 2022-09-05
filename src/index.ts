// imports
import { Observable, Subscriber } from 'rxjs';


// 1. create an observable called obs#
    // const obs$ = Observable.create(); // deprecated way
const obs$ = new Observable<string>(
    // there is a subscriber inside the observable
    (subscriber: Subscriber<string>) => {
        // creating subscriptions to look for observable's emits (changes)
        subscriber.next('Hello'); // emits a message
        subscriber.next('World!');


        // To avoid to notify of posterior values
        subscriber.complete();

        // these messages will not be emitted
        subscriber.next('Hi');
    }
);


// subscribe to our observable to print the value that obs emits
// obs$.subscribe( res => console.log(res));
obs$.subscribe(console.log);