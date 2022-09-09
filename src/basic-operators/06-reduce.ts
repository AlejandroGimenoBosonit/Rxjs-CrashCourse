import { interval, reduce, take, tap } from 'rxjs';

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
