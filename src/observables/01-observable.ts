// imports
import { Observable, Observer, Subscriber } from 'rxjs';


// 1. create an observable called obs#
    // const obs$ = Observable.create(); // deprecated way
const obs$ = new Observable<string>(
    // there is a subscriber inside the observable
    (subscriber: Subscriber<string>) => {
        // creating subscriptions to look for observable's emits (changes)
        subscriber.next('Hello'); // emits a message
        subscriber.next('World!');

        // force an error when observable subscribes
        // const a = undefined;
        // a.name = 'John';

        // To avoid to notify of posterior values
        subscriber.complete();

        // these messages will not be emitted
        subscriber.next('Hi');
    }
);

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Second exmaple: subscribe to our observable to print the value that obs emits
// obs$.subscribe( res => console.log(res));

const obs2$ = new Observable<string>();
obs2$.subscribe({
    next:       value => console.log('next: ', value),
    error:      error => console.warn( 'error: ', error ),
    complete:   () => console.info('Completed')
});
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Third example: using Observer
const obs3$ = new Observable<string>();
const observer: Observer<string> = {

    next:       value => console.log('next: ', value),
    error:      error => console.warn( 'error: ', error ),
    complete:   () => console.info('Completed')

}
obs3$.subscribe( observer );