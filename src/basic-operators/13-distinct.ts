import { distinct, from, of } from "rxjs";

const numbers$ = of(1,1,1,2,'2',3,3,4,5,6,7,8,'9',6,2);

numbers$.pipe(
    distinct()// If there is a repeated value, thos operator will avoid it
)
.subscribe(console.log);
// 1,2,'2',3,4,5,6,7,'9'




// ej2
interface Character {
    name: string;
};

const characters: Character[] = [
    { name: 'Megaman' },
    { name: 'X' },
    { name: 'Zero' },
    { name: 'Willi W.' },
    { name: 'X' },
    { name: 'Megaman' },
];

from( characters )
.pipe(
    // distinct()
    /*
    Without arguments 'distinct' doesn't detect any object equel to another. 
    This means that every object is an unique one even though the values ​​match
    */

    distinct( character => character.name )
    /*
    If we send a function as an argument we can specify the object's key that we want to 
    distinct
    */
)
.subscribe(console.log)