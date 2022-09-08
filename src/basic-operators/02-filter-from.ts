import { range, from } from 'rxjs';
import { filter } from 'rxjs/operators';

const observer$ = range(1,5); // 1, 2, 3, 4, 5

observer$
.pipe(
    filter<number>( (value, index) => {
        // console.log(`Value at index ${index}: ${value} is odd? ${value%2===1}`);
        return value%2 === 1 
    }) // odd numbers
)
.subscribe( console.log )

/////////////////////////////////////////////////////////////
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