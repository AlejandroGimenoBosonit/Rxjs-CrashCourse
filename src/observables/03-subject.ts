import { Observer, Observable, Subject } from 'rxjs';
// Subject Exercise
/*

Create an observable that emits random numbers every second

*/

// observer
const observer: Observer<any> = {
    next        : value => console.log( 'next: ', value ),
    error       : error => console.warn( 'error: ', error ),
    complete    : () => console.info( 'COMPLETED' ),
};

// observable
const interval$ = new Observable<number>( subscriber=>{

    const intervalID = setInterval(()=>{
        return subscriber.next( Math.random() );
    }, 1000);

    // when unsubscribe is called
    return ()=>{
        clearInterval(intervalID);
        console.log("Interval destroyed");
        
    };

});

// Subject
/*
Special Observable type. 

1- Multiple Cast
    Multiple subscriptions linked to this observable

2- Is an Observer too. Can be sent as argument to the observable.

3- Next, error and complete

*/
const subject$ = new Subject();
// use subject to send same info to multiple subscriptions
const subscription = interval$.subscribe( subject$ );

const subs1 = subject$.subscribe( observer );
const subs2 = subject$.subscribe( observer );


// subscriptions with different sent information
// const subs1 = interval$.subscribe( random => console.log('sub1: ', random) );
// const subs2 = interval$.subscribe( random => console.log('sub2: ', random) );

setTimeout(() => {
    subject$.next(10);
    subject$.complete();
    subscription.unsubscribe();
}, 3500);
