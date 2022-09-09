import { distinct, of } from "rxjs";

const numbers$ = of<[
    number, 
    string, 
    number, 
    number, 
    number, 
    number, 
    number, 
    number, 
    string
]>(1,'2',3,4,5,6,7,8,'9');

numbers$.pipe(
    distinct()
)
.subscribe(console.log);

interface Character {
    name: string;
};

const characters: Character[] = [
    {},
];