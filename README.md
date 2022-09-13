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

## Basic Operators

- [Operators](#basic-operators-1)
- [Operators: 'map'](#map)
- [Operators: 'filter'](#filter-and-from)
- [Operators: 'Chained Operators' ](#chained-operators)
- [Operators: 'tap'](#tap)
- [Progress-Bar](#progress-bar)
- [Operators: 'reduce'](#reduce)
- [Operators: 'scan'](#scan)

## Not Common Operators

- [Operators: 'take'](#take)
- [Operators: 'first'](#first)
- [Operators: 'takeWhile'](#takewhile)
- [Operators: 'takeUntil'](#takeuntil)
- [Operators: 'skip'](#skip)
- [Operators: 'distinct'](#distinct)
- [Operators: 'distinctUntilChanged'](#distinctuntilchanged)
- [Operators: 'distinctUntilKeyChanged'](#distinctuntilkeychanged)

## Operators that Deals With Time

- [Operators: 'debounceTime'](#debouncetime)
- [Operators: 'throttleTime'](#throttletime)
- [Operators: 'sampleTime'](#sampletime)
- [Operators: 'sample'](#sample)
- [Operators: 'auditTime'](#audittime)

## RxJS using Ajax

- [General ajax request](#general-ajax-request)
- [Error Mangement with Fetch API](#error-mangement-with-fetch-api)
- [RxJS Request - catchError](#rxjs-request---catcherror)
- [RxJS Request - getJSON](#rxjs-request---getjson)
- [C.R.U.D](#crud)

---

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
async scheduler schedules tasks asynchronously, by putting them on the JavaScript event loop queue. It is best used to delay tasks in time or to schedule tasks repeating in intervals.

If you just want to "defer" task, that is to perform it right after currently executing synchronous code ends (commonly achieved by setTimeout(deferredTask, 0)), better choice will be the asapScheduler scheduler.

```
import { asyncScheduler } from 'rxjs';

// setTimeout (() => {}, 3000);
// setInterval(() => {}, 3000);

const s  = () => console.log('Hello World');
const s = name => console.log(`Hello ${ name }`);

// asyncScheduler.schedule( s, 2000 );
// asyncScheduler.schedule( s, 2000, 'Fernando' );


 const subs = asyncScheduler.schedule( function(state){

    console.log('state', state);

    this.schedule( state + 1, 1000 );
    
}, 3000, 0 );


// setTimeout( () => {
//     subs.unsubscribe();
// }, 6000);

asyncScheduler.schedule( ()=> subs.unsubscribe(), 6000 );
```
---
## Basic Operators

RxJS is mostly useful for its operators, even though the Observable is the foundation. Operators are the essential pieces that allow complex asynchronous code to be easily composed in a declarative manner.

What are operators?
Operators are functions. There are two kinds of operators:

Pipeable Operators are the kind that can be piped to Observables using the syntax observableInstance.pipe(operator()). These include, filter(...), and mergeMap(...). When called, they do not change the existing Observable instance. Instead, they return a new Observable, whose subscription logic is based on the first Observable.

A Pipeable Operator is a function that takes an Observable as its input and returns another Observable. It is a pure operation: the previous Observable stays unmodified.

A Pipeable Operator is essentially a pure function which takes one Observable as input and generates another Observable as output. Subscribing to the output Observable will also subscribe to the input Observable.

Creation Operators are the other kind of operator, which can be called as standalone functions to create a new Observable. For example: of(1, 2, 3) creates an observable that will emit 1, 2, and 3, one right after another. Creation operators will be discussed in more detail in a later section.

More examples at the [RxJS official site](https://www.learnrxjs.io/learn-rxjs/operators)!

## map

Used to apply projection with each value from source.

```
map(

    project: Function, 
    thisArg: any

): Observable
```

**Example**: 
In this case the observable 'range' will emit 5 emissions from 1 as starter value.BUT if We want to take these values and modify them to emit from 10 to 50 We can use this operator:

```
import { range } from 'rxjs';
import { map } from 'rxjs/operators';


const observable$ = range(1,5);

observable$.pipe(

    map( value => value * 10 )

).subscribe( console.log );

```

## filter and from

### filter
Emit values that pass the provided condition.

```
filter(

    select: Function, 
    thisArg: any

): Observable
```

**Example**: 
```
import { range, from } from 'rxjs';
import { filter } from 'rxjs/operators';

const observer$ = range(1,5); // 1, 2, 3, 4, 5

observer$
.pipe(
    filter<number>( (value, index) => {
        
        return value%2 === 1 
    
    }) // odd numbers
)
.subscribe( console.log )
```

### from
Turn an array, promise, or iterable into an observable.
```
from(
    
    ish: ObservableInput, 
    mapFn: function, 
    thisArg: any, 
    scheduler: Scheduler

): Observable
```
**Example**:
```
interface Character {
    type: string;
    name: string;
}

const characters: Character[] = [
    { type: 'hero', name: 'Batman' },
    { type: 'hero', name: 'Robin' },
    { type: 'villain', name: 'Joker' },
];

from(characters)
.pipe(
    filter<Character>( character => character.type==='hero' )
)
.subscribe(filteredCharacter => console.log(filteredCharacter.name))
```

### Chained Operators

Example where we want to filter all our keyboard event in the page
and print by console ONLY when we press 'Enter'. For this example We want to do two steps:

- Map the keyboard event to extract the key's code
- Using the  key's code to check if is 'Enter'

```
import { fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';

const observable$ = fromEvent<KeyboardEvent>( document, 'keyup');
        
observable$.pipe(

    map( event => event.code ),
    filter( key => key === 'Enter' )
    
)
.subscribe(console.log)
```

### tap

Transparently perform actions or side-effects, such as logging.

```
import { range } from "rxjs";
import { map, tap} from 'rxjs/operators';
const numbers$ = range (7,1);

numbers$
.pipe(
    tap( x => {
        console.log('BEFORE: ', x);
        return x*1000000; // The return statement is ignored everytime
    }),

    map( value => value*10),
    
    tap({
        next: y => console.log("AFTER: ", y),
        error: err => console.log("SOMETHING IT'S WRONG!"),
        complete: () => console.log("That's all, folks!")
    })
)
.subscribe( final => console.log("Final Value:", final));
```

### Progress-Bar

Example to create a progress bar in a html document from typescript and rxjs operators:

- 1. Create a div element

    ```
    const text = document.createElement('div');
    ```
- 2. Assign a content to the div element
    ```
    text.innerHTML = `

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et nisi hendrerit nunc egestas tincidunt at in nunc. Cras molestie facilisis magna, non vehicula nibh euismod quis. Curabitur sed odio non velit porta ultricies vel id ipsum. Curabitur venenatis neque erat, quis rhoncus neque iaculis a. Cras eu euismod odio, sed mollis magna. Aliquam ut dui a libero elementum rhoncus a ac enim. Nullam posuere odio sem, nec porta ligula sodales et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse finibus, odio sed mattis porttitor, orci ante commodo sapien, vel convallis tortor tortor id urna.
    <br/><br/>  
    ...
    `;
    ```
- 3. Declare a body element and assign our text
    ```
    // body referene
    const body = document.querySelector('body');

    // asign text into body
    body.append( text );
    ```
- 4. Assign a progress bar
    ```
    // progress bar - div that increments ts weight by scroll or %
    const progressBar = document.createElement('div');

    progressBar.setAttribute('class', 'progress-bar');

    body.append( progressBar );
    ```
- 5. Subscribe to the observable 
    ```
    // subscribe to the html scroll to obtain the percentage
    const scroll$ = fromEvent( document, 'scroll' );
    const percentage$ = scroll$.pipe(
        // percentage calculus
        map( percentageCalc ),
        tap( console.log )
    );

    percentage$.subscribe( percentage => {
        // assign new percentage to the style
        progressBar.style.width = `${percentage}%`
    })

    ```
- 6. A method to calculate our scroll's percentage
    ```
    // method to calculate percentage
    const percentageCalc = ( event ) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target.documentElement;
        return (scrollTop / (scrollHeight - clientHeight))*100;;
    };
    ```

- FULL EXAMPLE:

    ```
    import { fromEvent, map, tap } from 'rxjs';

    // create a div element in the DOM
    const text = document.createElement('div');

    text.innerHTML = `

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et nisi hendrerit nunc egestas tincidunt at in nunc. Cras molestie facilisis magna, non vehicula nibh euismod quis. Curabitur sed odio non velit porta ultricies vel id ipsum. Curabitur venenatis neque erat, quis rhoncus neque iaculis a. Cras eu euismod odio, sed mollis magna. Aliquam ut dui a libero elementum rhoncus a ac enim. Nullam posuere odio sem, nec porta ligula sodales et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse finibus, odio sed mattis porttitor, orci ante commodo sapien, vel convallis tortor tortor id urna.
    <br/><br/>  
    Morbi sed nisl feugiat, pharetra lectus sit amet, dapibus mauris. Curabitur semper ut turpis ut fringilla. Nullam pharetra orci porttitor, lacinia leo a, mattis mi. Nunc gravida pretium ante nec aliquam. Mauris eleifend massa in dolor ullamcorper ornare. Morbi ut leo sit amet erat rhoncus egestas ac a est. Nam aliquam velit augue, eget iaculis eros varius id.
    `;

    // body referene
    const body = document.querySelector('body');

    // asign text into body
    body.append( text );


    // progress bar - div that increments ts weight by scroll or %
    const progressBar = document.createElement('div');

    progressBar.setAttribute('class', 'progress-bar');

    body.append( progressBar );



    // method to calculate percentage
    const percentageCalc = ( event ) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target.documentElement;
        return (scrollTop / (scrollHeight - clientHeight))*100;;
    };


    // subscribe to the html scroll to obtain the percentage
    const scroll$ = fromEvent( document, 'scroll' );
    const percentage$ = scroll$.pipe(
        // percentage calculus
        map( percentageCalc ),
        tap( console.log )
    );

    percentage$.subscribe( percentage => {
        // assign new percentage to the style
        progressBar.style.width = `${percentage}%`
    })



    ```
### reduce
Applies an accumulator function over the source Observable, and returns the accumulated result when the source completes, given an optional seed value.

```
reduce<V, A>(
    accumulator: (
        acc: V | A, 
        value: V, 
        index: number
    ) => A, 
    
    seed?: any
): OperatorFunction<V, V | A>
```

OperatorFunction<V, V | A>: A function that returns an Observable that emits a single value that is the result of accumulating the values emitted by the source Observable.

```
import { reduce, interval, take, tap } from 'rxjs';

const numbers = [1,2,3,4,5];

interval(1000)
.pipe(
    take(6),
    tap( console.log ),
    reduce( (accumulator: number, actualValue: number) => accumulator + actualValue)
)
.subscribe({
    next: value => console.log('next: ', value),
    complete: () => console.log('Complete')
})

```

### scan

Useful for encapsulating and managing state. Applies an accumulator (or "reducer function") to each value from the source after an initial state is established -- either via a seed value (second argument), or from the first value from the source.

```
scan<V, A, S>(

    accumulator: (
        acc: V | A | S, 
        value: V, 
        index: number
    ) => A, 
    seed?: S
    
): OperatorFunction<V, V | A>
```
---

## Not Common Operators

### take
Emits only the first count values emitted by the source Observable.

```
take<T>(

    count: number
    
): MonoTypeOperatorFunction<T>
```

**Example**: 
```
import { of } from 'rxjs';
import { take, tap } from 'rxjs/operators';


// We need and observalble
const numbers$ = of(1,2,3,4,5);

numbers$.pipe(
    tap( t => console.log('tap', t) ),
    take(2)
)

.subscribe({
    next: value => console.log( value ),
    complete: ()=> console.log('Complete')
});
```

### first
Emits only the first value (or the first value that meets some condition) emitted by the source Observable.

```
first<T, D>(
    predicate?: (
        value: T, 
        index: number, 
        source: Observable<T>
    
    ) => boolean, 
    defaultValue?: D

): OperatorFunction<T, T | D>
```

**Example**: 

```
import { fromEvent } from 'rxjs';
import { first, tap, map } from 'rxjs/operators';

const click$ = fromEvent<MouseEvent>( document, 'click' );

click$
.pipe(
    tap(console.log),
    first( event => event.clientY >= 150 )
)
.subscribe({
    next: value => console.log(value),
    complete: ()=> console.log('Complete')
})
```

### takeWhile
Emits values emitted by the source Observable so long as each value satisfies the given predicate, and then completes as soon as this predicate is not satisfied.

```
takeWhile<T>(
    predicate: (
    
        value: T, 
        index: number
    
    ) => boolean, 
    
    inclusive: boolean = false
    
): MonoTypeOperatorFunction<T>
```
**Example**: 

```
import { fromEvent } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

const click$ = fromEvent<MouseEvent>( document, 'click' );

click$
.pipe( 
    map(({ x,y }) => ({x,y})),
    takeWhile( ({y}) => y <= 150, true )
)
.subscribe({
    next: value => console.log( value ),
    complete: ()=> console.log('Complete!')
});
```

### takeUntil
Emits the values emitted by the source Observable until a notifier Observable emits a value.

```
takeUntil<T>(

    notifier: ObservableInput<any>
    
): MonoTypeOperatorFunction<T>
```

**Example**:
```

import { interval, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// create html button
const button = document.createElement('button');
button.innerHTML = 'Stop Timer';
document.querySelector('body').append(button);


// counter - observable
const counter$ = interval(1000);
const clieckBtn = fromEvent(button, 'click');

// subscription
counter$
.pipe(
    takeUntil( clieckBtn )
)
.subscribe({
    next: value => console.log('Next: ', value),
    complete: ()=> console.log('Complete')
})
```

### skip
Returns an Observable that skips the first count items emitted by the source Observable.

```
skip<T>(

    count: number
    
): MonoTypeOperatorFunction<T>
```
**Example**:
```
import { interval, fromEvent } from 'rxjs';
import { takeUntil, skip, tap } from 'rxjs/operators';

// create html button
const button = document.createElement('button');
button.innerHTML = 'Stop Timer';
document.querySelector('body').append(button);


// counter - observable
const counter$ = interval(1000);
const clieckBtn = fromEvent(button, 'click');

// subscription
counter$
.pipe(
    tap( ()=>console.log('tap element before') ),
    skip(1),
    tap( ()=>console.log('tap element after') ),

    takeUntil( clieckBtn )
)
.subscribe({
    next: value => console.log('Next: ', value),
    complete: ()=> console.log('Complete')
})
```
### distinct
Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.

```
distinct<T, K>(

    keySelector?: (value: T) => K, 
    flushes?: Observable<any>
    
): MonoTypeOperatorFunction<T>
```
**Example**:
```
const numbers$ = of(1,1,1,2,'2',3,3,4,5,6,7,8,'9',6,2);

numbers$.pipe( distinct() ).subscribe(console.log);

// log -> 1,2,'2',3,4,5,6,7,8,'9'
```

- Using objects
```
interface Character {
    name: string;
};

const characters: Character[] = [ { name: 'Megaman' },
    { name: 'X' },
    { name: 'Zero' },
    { name: 'Willi W.' },
    { name: 'X' },
    { name: 'Megaman' },
];

from( characters )

.pipe(    distinct( character => character.name ) )

.subscribe(console.log)

// log -> { name: 'Megaman' }, { name: 'X' }, { name: 'Zero' }, { name: 'Willi W.' }
```

### distinctUntilChanged

Returns a result Observable that emits all values pushed by the source observable if they are distinct in comparison to the last value the result observable emitted.

```
distinctUntilChanged<T, K>(

    comparator?: (previous: K, current: K) => boolean, 
    keySelector: (value: T) => K = identity as (value: T) => K
    
): MonoTypeOperatorFunction<T>
```

**Example**:
```
const numbers$ = of(1,1,1,2,1,'2',3,3,4,5,6,7,8,'9',6,2);

numbers$.pipe(
    distinctUntilChanged()// only distinct the previous and actual value
)
.subscribe(console.log);

// 1,2,1,'2',3,4,5,6,7,'9',6,2
```
- Using objects
```
interface Character {
    name: string;
};

const characters: Character[] = [
    { name: 'Megaman' },
    { name: 'Megaman' },
    { name: 'Zero' },
    { name: 'Willi W.' },
    { name: 'X' },
    { name: 'X' },
];

from( characters )
.pipe(
    distinctUntilChanged( (previousValue, actualValue) => previousValue.name === actualValue.name )
)
.subscribe(console.log)

// log -> { name: 'Megaman' }, { name: 'Zero' }, { name: 'Willi W.' }, { name: 'X' }

```

### distinctUntilKeyChanged
Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item, using a property accessed by using the key provided to check if the two items are distinct.

```
distinctUntilKeyChanged<T, K extends keyof T>(

    key: K, 
    compare?: (x: T[K], y: T[K]) => boolean
    
): MonoTypeOperatorFunction<T>
```
**Example**:
```
import { distinctUntilKeyChanged, from } from "rxjs";

interface Character {
    name: string;
};

const characters: Character[] = [
    { name: 'Megaman' },
    { name: 'Megaman' },
    { name: 'Zero' },
    { name: 'Willi W.' },
    { name: 'X' },
    { name: 'X' },
];

from( characters )
.pipe(
    distinctUntilKeyChanged('name')
)
.subscribe(console.log)

// log -> { name: 'Megaman' }, { name: 'Zero' }, { name: 'Willi W.' }, { name: 'X' }
```
---
## Operators that Deals With Time

### debounceTime
Emits a notification from the source Observable only after a particular time span has passed without another source emission.

```
debounceTime<T>(
    
    dueTime: number, 
    scheduler: SchedulerLike = asyncScheduler

): MonoTypeOperatorFunction<T>
```
**Example**:
```
const input = document.createElement('input');
// append input to the html body
document.querySelector('body').append( input );

// create observable to detect every new text entry 
const input$ = fromEvent( input, 'keyup' );

input$
.pipe(
    debounceTime( 1000 ),
    map( event => event.target['value'] )
)
.subscribe(console.log)
```

### throttleTime
Emits a value from the source Observable, then ignores subsequent source values for duration milliseconds, then repeats this process.

```
throttleTime<T>(

    duration: number, 

    scheduler: SchedulerLike = asyncScheduler, 
    
    config: ThrottleConfig = defaultThrottleConfig

): MonoTypeOperatorFunction<T>
```
**Example**:
In the following example we want to emit an html input's value **every 2 seconds** taking only the first element and the last one
```
//create input element
const input = document.createElement('input');
// append input to the html body
document.querySelector('body').append( input );

// create observable to detect every new text entry 
const input$ = fromEvent( input, 'keyup' );

input$
.pipe(
    throttleTime( 
        // duration toevery output emission
        1000,
        // scheduler
        asyncScheduler,
        // to emit the first and last element
        {
            leading: false,// we can specify to emi the first element
            trailing: true // To obtain the entire query (final element)
        }
    ),
    map( event => {
        console.log('+1 second passed');
        return event.target['value']
    } )
)
.subscribe(console.log)
```
### sampleTime
Emits the most recently emitted value from the source Observable within periodic time intervals.

```
sampleTime<T>(

    period: number, 
    scheduler: SchedulerLike = asyncScheduler

): MonoTypeOperatorFunction<T>
```
**Example**:
```
// event to look for a mouse event
const click$ = fromEvent<MouseEvent>( document, 'click' );

click$
.pipe(
    sampleTime( 2000 ), // wait X seconds
    map( ({x, y})=> ({x, y}) )// map every event every X secons
)
.subscribe(console.log);
```
### sample
Emits the most recently emitted value from the source Observable whenever another Observable, the notifier, emits.

```
sample<T>(
    notifier: Observable<any>
): MonoTypeOperatorFunction<T>

```
**Example**:
```
import { interval, fromEvent } from 'rxjs';
import { sample } from 'rxjs/operators';

// observables
const interval$ = interval(100);
const click$ = fromEvent( document, 'click' );


// subscribe to the number emissions observable every time the click observable emits an event
interval$
.pipe(
    sample( click$ )
)
.subscribe(console.log)
```
### auditTime
Ignores source values for duration milliseconds, then emits the most recent value from the source Observable, then repeats this process.

```
auditTime<T>(

    duration: number, 
    scheduler: SchedulerLike = asyncScheduler

): MonoTypeOperatorFunction<T>
```
**Example**:
```
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
```

---

## RxJS using Ajax
Simple API calling example using ajax:
```
// api calling
const url = 'https://api.github.com/usersw?per_page=5';

// request using fetch API
const fetchPromise = fetch( url );

// get information
fetchPromise
.then( response => response.json() )
.then( data => console.log( 'data: ', data ) )
.catch( error => console.warn( 'error in users: ', error ) )
```
### Error Mangement with Fetch API
We can managing our errors using the 'then' statement in our promise like the example below:
```
// api calling
const url = 'https://api.github.com/usersw?per_page=5';

// request using fetch API
const fetchPromise = fetch( url );

/////////////////////////////////////////////////////////////////////
// Error managing
const errorManaging = ( response: Response ) => {
    if( !response.ok ) throw new Error( response.statusText );

    return response;
};
/////////////////////////////////////////////////////////////////////

// get information
fetchPromise
.then( errorManaging )
.then( response => response.json() )
.then( data => console.log( 'data: ', data ) )
.catch( error => console.warn( 'error in users: ', error ) )
```

### RxJS Request - catchError
An alternative way to deal with our error could be the 'catchError' RxJS operator:

```
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
```

### RxJS Request - getJSON
A shorter way to make a HTTP request using ajax:
```
import { ajax } from 'rxjs/ajax';

const url: string = "https://httpbin.org/delay/1";

const observable$ = ajax.getJSON( url, {
    'Content-Type':'application/json',
    'mt-token':'ABC123'
});

observable$.subscribe( response => console.log('Data: ', response) )
```

### C.R.U.D

- GET request
```
const url:string = 'https://httpbin.org/delay/1';

// get request
ajax
.get(url, {
    'Content-Type':'application/json',
    'my-token':'ABC123'
})
.subscribe( (response) => console.log( response ) );
```

- POST request
```
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
```

- PUT request
```
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
```

- DELETE request
```
// delete rquest
ajax
.delete(
    url, // path
    {
        'my-token':'ABC123' // header
    }
)
.subscribe( (response) => console.log( response ) )
```

- ALTERNATIVE FORM
```
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
```