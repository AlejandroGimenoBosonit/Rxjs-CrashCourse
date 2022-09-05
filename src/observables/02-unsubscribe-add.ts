import { Observer, Observable } from 'rxjs';
// Subscription & Unsubscribe exercise

const observer: Observer<any> = {
    next:       value => console.log('next: ', value),
    error:      error => console.warn( 'error: ', error ),
    complete:   () => console.info('Completed')
};

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

        }, 1000
    )

    // desired process when observable is unsubscribed
    return () => {
        // stop setInterval
        clearInterval( interval );
        console.log("interval destroyed");
        
    };

});

// observable's instance
const subs1 = interval$.subscribe( observer );
const subs2 = interval$.subscribe( observer );
const subs3 = interval$.subscribe( observer );

// Chained observable
subs1.add(subs2);
subs1.add(subs3);

// cancel subscription at the three first seconds
setTimeout(
    ()=>{
        subs1.unsubscribe();
        // subs1.unsubscribe();
        // subs2.unsubscribe();
        // subs3.unsubscribe();

        console.log("canceled subscription");
        
    },
    3000
);