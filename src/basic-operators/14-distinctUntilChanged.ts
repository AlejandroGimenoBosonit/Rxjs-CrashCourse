import { distinct, distinctUntilChanged, from, of } from "rxjs";

const numbers$ = of(1,1,1,2,1,'2',3,3,4,5,6,7,8,'9',6,2);

numbers$.pipe(
    distinctUntilChanged()// only distinct the previous data
)
.subscribe(console.log);
// 1,2,1,'2',3,4,5,6,7,'9',6,2




// ej2
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