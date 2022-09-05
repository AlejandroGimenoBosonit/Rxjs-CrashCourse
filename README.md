# RxJS Course Documentation

## Theory Index

- [Basic RxJS Concepts](#basic-rxjs-concepts)
- [ReactiveX](#reactivex)
- [Observable Pattern](#observable-pattern )

## Code Index

- [Observables](#observables)
- [Observer and Subscriber](#observer-and-subscriber)
- [Subscription & Unsubscribe](#subscription--unsubscribe)
- [Subject]()
- [Hot & Cold Observables]()
- []()

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
