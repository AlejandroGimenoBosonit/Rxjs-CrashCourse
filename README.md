# RxJS Course Documentation

## Theory Index

- [Basic RxJS Concepts](#basic-rxjs-concepts)
- [ReactiveX](#reactivex)
- [Observable Pattern](#observable-pattern )

## Code Index

- [Observables](#observables)
- [Observer and Subscriber](#observer-and-subscriber)
- [Subscription & Unsubscribe](#subscription--unsubscribe)
- [Subject](#subject)

## Observable Creation

- [of](#function-of)
- [fromEvent](#function-fromevent)
- [range](#function-range)
- [interval/timer](#function-interval--timer)
- [asyncScheduler](#function-asyncscheduler)
- [from/of Examples]()


## Basic RxJS Concepts

We want to obtain information in real time. There are several example of apps and projects that need to obtain information by **reactive functions**. We want to our app ould make request at the same time that we make another process and update it when the request is finished.

Reactive programming orders:
- Observables
- Subscribers
- Operators

An **Observable** is the source of info that emit values (or not). They can be finites or infinites, asynchronous or synchronous, etc.

A **Subscriber** 'subscribes' itself to an observable( look for any change or action that the observable does). They use the data or information that our observable is returning. They can recieve the observable's errors or events, but they cannot access or interact with any of the observable inner process.

The **Operators** are used to transform observables(**e.g: map, group, scan, etc**). We can use them to filter observables or combine and create new observables.

Reasons to use "Reactive Programming"

- Avoid the "Callback Hell" (callbacks being called inside another callbacks).
- Work with async and synchronous tasks easier.
- Use Operators to reduce and simplify our work.
- Transform workflow into information.
- Clean code.
- Easy to learn and use.

## ReactiveX

[ReactiveX](https://reactivex.io/) is an API for asynchronous programming with observable streams. ReactiveX is a combination of the best ideas from the Observer pattern, the Iterator pattern, and functional programming.

We can choose the platform that we like to use with our programming language. (**https://reactivex.io/languages.html**).


## Observable Pattern
The 'Observer Pattern' is a software design pattern that defined a 'onse-to-many' dependency between objects. When any of the object changes its state, it notifies the change to all.

In O.O.P (Object-Oriented Programming) the pattern ddefines an interface that declares the neccessary methods to access to a group of objects of a collection. In other words, we'll create methods to allow us to know which is the first element, the next one ( if there is one) and the actual element.

In 'Functional Programming' We create a group of methods or functions with a common objective without secondary effects or mutations.

---

## Observables
Our observable is an object that COULD emit a value (or not). In this example we're going to subscribe to our observable when it emits a message. At this point with every message our observable will emit only the most recent value.

There will be a observer's method to complete the process. This means that our observable will stop or 'complete' the task. This not means that our observer will stop to emit value, but our exit will not recieve them.

```
// imports
import { Observable, Subscriber } from 'rxjs';


// 1. create an observable called obs#
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
obs$.subscribe(console.log);

```

## Observer and Subscriber

Implements the Observer interface and extends the Subscription class. While the Observer is the public API for consuming the values of an Observable, all Observers get converted to a Subscriber, in order to provide Subscription-like capabilities such as unsubscribe. Subscriber is a common type in RxJS, and crucial for implementing operators, but it is rarely used as a public API.

We can define inside our observable's subscribe method three callbacks with three examples:
- Integrating inside an Observable
    ```
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
    ```
- Using the 'Subscribe' method
   ```
   const obs2$ = new Observable<string>();
    obs2$.subscribe(
        // calling three callbacks
        {
            next:       value => console.log('next: ', value),
            error:      error => console.warn( 'error: ', error ),
            complete:   () => console.info('Completed')
        }
    );
   ``` 
- Declaring an external Observer
    ```
    const obs3$ = new Observable<string>();
    const observer: Observer<string> = {

        next:       value => console.log('next: ', value),
        error:      error => console.warn( 'error: ', error ),
        complete:   () => console.info('Completed')

    }
    obs3$.subscribe( observer );
    ```

## Subscription & Unsubscribe

In this section we're going to study how works an observable and how unsubscribe from our observable's instance.

- First of all We're going to declare an Observable where We will declare a counter method.
    ```
    const interval$ = new Observable<number>( subscriber => {
        let counter: number = 0;

        // define counting by js method 'setInterval' that emits a value every x seconds
        const interval = setInterval( ()=>{
            counter++;

            // We need to EMIT (the counter value) to our subscription
            subscriber.next( counter );

        }, 1000 );
    });
    ```
- In second place We're going to create a observable's instance to subscribe to our observable
    ```
    const subs = interval$.subscribe();
    ```
- If we want to unsubscribe from our observable instance we only need tocall this method. In this example We're going to stop our counter at the first three seconds.
    ```
    setTimeout(()=>{
        subs.unsubscribe();  
        },3000
    );
    ```
**WARNING**: If We put a console.log order in our observable's body We can see that our observable's content is still running at the sime time that our instance is unsubscribed. For correct this we can use the **Observable's return method** to define a process when we want to unsubscribed.

```
const interval$ = new Observable<number>( subscriber => {

    // counter variable will emit every second
    let counter: number = 0;

    const interval = setInterval(
        // js method that execute body every second
        () => {
            counter++;
            // ATTENTION: Js process executing in background even if subscription is canceled
            console.log(counter);
            
            // emit subscription
            subscriber.next(counter);
        }, 1000)

    // desired process when observable is unsubscribed

    return () => {
        clearInterval( interval );
    };
});
```

We can see the full code in the following instruction:
```
const interval$ = new Observable<number>( subscriber => {

    // counter variable will emit every second
    let counter: number = 0;
    
    
    const interval = setInterval(
        // js method that execute body every second
        () => {
            
            counter++;
            // ATTENTION: Js process executing in background even if subscription is canceled
            console.log(counter);
            
            // emit subscription
            subscriber.next(counter);

        }, 1000)

    // desired process when observable is unsubscribed
    return () => {
        // stop setInterval
        clearInterval( interval );
        console.log("interval destroyed");
        
    };

});

// observable's instance
const subs = interval$.subscribe();

// cancel subscription at the three first seconds
setTimeout(()=>{
    subs.unsubscribe();
    console.log("canceled subscription");       
},3000);
```

## Subject

An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers. While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable), Subjects are multicast.

**Every Subject is an Observable**. Given a Subject, you can subscribe to it, providing an Observer, which will start receiving values normally. From the perspective of the Observer, it cannot tell whether the Observable execution is coming from a plain unicast Observable or a Subject.

Internally to the Subject, subscribe does not invoke a new execution that delivers values. It simply registers the given Observer in a list of Observers, similarly to how addListener usually works in other libraries and languages.

**Every Subject is an Observer**. It is an object with the methods next(v), error(e), and complete(). To feed a new value to the Subject, just call next(theValue), and it will be multicasted to the Observers registered to listen to the Subject.

In the example below We create an observable that emits random numbers every second:

```
import { Observer, Observable, Subject } from 'rxjs';

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
const subject$ = new Subject();

// use subject to send same info to multiple subscriptions
const subscription = interval$.subscribe( subject$ );

const subs1 = subject$.subscribe( observer );
const subs2 = subject$.subscribe( observer );

setTimeout(() => {
    subject$.next(10);
    subject$.complete();
    subscription.unsubscribe();
}, 3500);

```
---
## Observable Creation

## Function 'of()'

This method allows us to create a observable by a value as argument. In the code below we can see how We create an observable that emits a group of numbers until it completes and finish the process.

```
import { of } from "rxjs";

const observer$ = of(1,2,3,4,5,6);

observer$.subscribe(console.log)
```

This method converts its argument into a sequence of values that would be emitted( **of< T >(...args: Array< T | SchedulerLike >): Observable< T >** ).

```
import { of } from "rxjs";

const observer$ = of(1,2,3,4,5,6);

// We also could send to it an array's content as a parameter
const observer$ = of<number[]>(...[1,2,3,4,5,6,7]);

// A bit more complicated...
const observer$ = of<any>( [1,2], {a:1, b:2}, function(){return 'Hi';}, true, Promise.resolve(true) );

observer$.subscribe({
    next:       value => console.log('next: ', value),
    error:      error => console.warn( 'error: ', error ),
    complete:   () => console.info('Completed')
})
```

## Function 'fromEvent()'

Creates an Observable that emits events of a specific type coming from the given event target.

```
fromEvent< T >(
        target          : any, 
        eventName       : string, 
        options?        : EventListenerOptions | ((...args: any[]) => T), 
        resultSelector? : (...args: any[]) => T
): Observable< T >
```
In the example below We will see how we can access to a target using an event. For example the 'DOM' events:

```
// fromEvent exercise
import { fromEvent } from 'rxjs';

const src1$ = fromEvent<MouseEvent>(
    // target: The entire html document
    document,
    // eventName: when user make a mouse's 'click'
    'click'
);
const src2$ = fromEvent<KeyboardEvent>(
    // target: The entire html document
    document,
    // eventName: when user press up a key
    'keyup'
);

// create a simple observer
const observer = {
    next: val => console.log('Value: ', val)
};

// subscription to the observable by observer
src1$.subscribe( observer );

// subscription to the observable to extract the pointer's coordinates
src1$.subscribe(({x, y})=>{
    console.log(`Pointer Coordinates -> x: ${x}, y: ${y}`);
})

// subscription to the observable to print the key that we pressed.
src2$.subscribe( event => {
    console.log('Key pressed: ', event.key)
});

```

## Function 'range()'

Creates an Observable that emits a sequence of numbers within a specified range.

```
range(
    start       : number = 0, 
    count?      : number, 
    scheduler?  : SchedulerLike
): Observable<number>
```

|    name   |      type      |  desc  |
|-----------|----------------|---------------------------------------------------------------------------------|
| start     |  number        | The value of the first integer in the sequence.                                 |   
| count     |  number        | Optional. Default is undefined. The number of sequential integers to generate.  |   
| scheduler |  [SchedulerLike](https://rxjs.dev/api/index/interface/SchedulerLike) | Optional. Default is undefined. A [SchedulerLike](https://rxjs.dev/api/index/interface/SchedulerLike) to use for scheduling the emissions of the notifications.  |   

- Examples
    ```
    // synchronous
    console.log('Start');
    const version2$ = range(
        1, // from: 1
        9 // emit 9 EMISSIONS (not the final point instead)
    );
    version2$.subscribe(console.log) // 1, 2, 3, 4, 5, 6, 7, 8, 9
    console.log('End');



    console.log('Start');
    const version3$ = range(
        -5, // from: -5
        10 // emit 10 EMISSIONS (not the final point instead)
    );
    version3$.subscribe(console.log)// -5, -4, -3, -2, -1, 0, 1, 2, 3, 4
    console.log('End');


    const version4$ = range(5); // 5 amissions because the start default's value is 0
    version4$.subscribe(console.log) // 0,1,2,3,4

    ```

**WARNING**: The RxJS v.8 has deprecated the parameter 'scheduler'. We use 'observeOn()' instead  with a pipe:
```
console.log('Start');
const observable$ = range( 1, 5);
observable$
    .pipe( observeOn( asyncScheduler ) )
    .subscribe(console.log) 
console.log('End');
/*

Async Outputs:
'Start'
'End'
0
1
2
3
4
*/
```

## Function 'Interval' & 'Timer'

### Interval

Creates an Observable that emits sequential numbers every specified interval of time, on a specified SchedulerLike.

```
interval(
    period: number = 0, 
    scheduler: SchedulerLike = asyncScheduler
): Observable<number>
```

|    name   |      type      |  desc  |
|-----------|----------------|---------------------------------------------------------------------------------|
| period    |  number        | Optional. Default is 0. The interval size in milliseconds (by default) or the time unit determined by the scheduler's clock.                                 |   
| scheduler     |  [SchedulerLike](https://rxjs.dev/api/index/interface/SchedulerLike)        | Optional. Default is [asyncScheduler](https://rxjs.dev/api/index/const/asyncScheduler). The SchedulerLike to use for scheduling the emission of values, and providing a notion of "time".  |   

```
import { interval } from "rxjs";

const ms: number = 1000; // time value as milliseconds

const observer = {
    next: val => console.log('next: ', val),
    complete: () => console.log('complete')
};

console.log('Start');
const interval$ = interval(ms);
interval$.subscribe( observer );
console.log('End');
```


### Timer

 ```
 timer(
    dueTime: number | Date = 0, 
    intervalOrScheduler?: number | SchedulerLike, 
    scheduler: SchedulerLike = asyncScheduler
): Observable<number>
 ```

This observable is useful for creating delays in code, or racing against other values for ad-hoc timeouts.

The delay is specified by default in milliseconds, however providing a custom scheduler could create a different behavior.

```
import { timer } from "rxjs";

const ms: number = 1000; // time value as milliseconds

const observer = {
    next: val => console.log('next: ', val),
    complete: () => console.log('complete')
};

const timer$ = timer( ms );

console.log('Start');
timer$.subscribe( observer );
console.log('Fin');
```

## Function 'asyncScheduler'
