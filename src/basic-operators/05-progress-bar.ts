import { fromEvent, map, tap } from 'rxjs';

// create a div element in the DOM
const text = document.createElement('div');

text.innerHTML = `

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et nisi hendrerit nunc egestas tincidunt at in nunc. Cras molestie facilisis magna, non vehicula nibh euismod quis. Curabitur sed odio non velit porta ultricies vel id ipsum. Curabitur venenatis neque erat, quis rhoncus neque iaculis a. Cras eu euismod odio, sed mollis magna. Aliquam ut dui a libero elementum rhoncus a ac enim. Nullam posuere odio sem, nec porta ligula sodales et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse finibus, odio sed mattis porttitor, orci ante commodo sapien, vel convallis tortor tortor id urna.
<br/><br/>  
Morbi sed nisl feugiat, pharetra lectus sit amet, dapibus mauris. Curabitur semper ut turpis ut fringilla. Nullam pharetra orci porttitor, lacinia leo a, mattis mi. Nunc gravida pretium ante nec aliquam. Mauris eleifend massa in dolor ullamcorper ornare. Morbi ut leo sit amet erat rhoncus egestas ac a est. Nam aliquam velit augue, eget iaculis eros varius id.
<br/><br/>
Proin hendrerit accumsan ipsum id condimentum. Curabitur consectetur ante nec ex tincidunt dictum. Vivamus cursus eu lacus eget ultricies. Cras mattis, ante venenatis condimentum convallis, lacus lectus gravida orci, eget auctor enim odio vitae metus. Nulla facilisi. Curabitur nec justo rhoncus, porta ante quis, posuere libero. In sed finibus ex. Fusce eleifend magna non molestie semper. Cras ut blandit leo.
<br/><br/>
Nunc malesuada, magna at hendrerit euismod, nunc diam hendrerit erat, quis fringilla metus lacus et lacus. Pellentesque ipsum libero, pretium nec odio eget, vulputate fringilla turpis. Aenean non elit tempus, mattis odio maximus, finibus nisi. Maecenas quis dolor varius, lobortis nibh sed, pellentesque augue. Maecenas eget fermentum lacus. Sed justo leo, tristique eu ultricies in, iaculis at dolor. Sed congue vitae elit et pretium. Pellentesque mattis dignissim eros, eget convallis libero.
<br/><br/>
Sed sed scelerisque erat, ac varius ex. Aliquam laoreet velit ipsum, eu malesuada dui ultrices nec. In ornare diam bibendum lectus varius laoreet. Pellentesque nisi enim, accumsan eget tempor in, facilisis vitae risus. Donec in risus risus. Proin mauris est, ultricies sit amet massa lobortis, finibus pellentesque mauris. Duis neque enim, pulvinar a gravida nec, molestie in mauris.
<br/><br/>
Aenean sit amet sapien ut nisi sodales bibendum at sed odio. Duis hendrerit eros risus, ut malesuada libero semper at. Etiam at vulputate ex, at condimentum sem. Curabitur commodo urna urna, volutpat efficitur massa aliquam eu. Praesent blandit, nisi eget rhoncus consequat, lacus tellus ullamcorper orci, vitae mattis sapien sapien at nulla. Integer vel ullamcorper lectus. Nulla ex nulla, placerat vitae ultricies et, pharetra quis quam. Morbi lobortis pellentesque sapien id tincidunt. Ut commodo porttitor orci ac finibus. Phasellus eget felis eget ipsum aliquet hendrerit a ac lacus. In arcu nibh, egestas condimentum magna sed, convallis pharetra arcu.
<br/><br/>
Donec ut sapien at massa maximus iaculis dictum eu magna. Maecenas euismod luctus urna sit amet vestibulum. Sed commodo, nisl a commodo gravida, turpis erat luctus ante, a efficitur odio neque nec ante. Nunc massa massa, dictum eu lacinia eget, rhoncus dapibus lectus. Integer eget sem dignissim, commodo arcu a, mattis metus. Fusce porta erat id porttitor fringilla. Suspendisse porta nisl ut orci ornare porta. Suspendisse et leo tortor. Nunc quis erat consequat, condimentum metus a, varius lorem. Integer sagittis nunc aliquam lacus pellentesque, at imperdiet nibh congue. Aenean a magna nec magna vestibulum tincidunt. Nulla placerat malesuada vehicula.
<br/><br/>
Ut blandit, mauris et malesuada placerat, orci sem varius eros, sed pellentesque quam nisi non mauris. Nulla ornare et mauris quis commodo. Nulla semper finibus enim. Donec pulvinar dui sed velit posuere semper. Morbi consectetur felis eget consectetur consequat. Aenean magna turpis, luctus quis enim ut, fermentum vestibulum elit. Sed vel molestie libero, quis tempus sem. Integer aliquam libero et malesuada interdum.
<br/><br/>
Etiam et suscipit sapien. Donec quis convallis ex. Nulla facilisi. Donec posuere, ex ut interdum imperdiet, erat leo condimentum sem, eget elementum diam orci quis dolor. Proin neque tortor, maximus et scelerisque a, consequat vitae odio. Ut vitae libero tincidunt, tristique velit vitae, lacinia nisi. In hac habitasse platea dictumst. Pellentesque eu ex ac justo consectetur interdum eu in tortor. Donec eros purus, tincidunt non ultricies eu, interdum at tellus. Donec in felis nec lectus semper rhoncus. Donec placerat erat vitae erat volutpat iaculis.
<br/><br/>
Sed erat risus, semper pharetra metus in, imperdiet rutrum ex. Donec a est a enim hendrerit imperdiet eu a risus. Donec pharetra eget nulla suscipit euismod. Suspendisse congue nisi id leo commodo, et scelerisque massa aliquam. Nulla fringilla quis neque sagittis viverra. Phasellus nisl est, ullamcorper non vestibulum ut, consequat et neque. Sed tempus ligula ut massa placerat vulputate. Aenean tempus diam quis scelerisque rhoncus. Fusce condimentum tincidunt mi nec ultricies. Curabitur pulvinar tellus vitae quam dapibus tempus. Mauris sodales fringilla ex, a pretium nulla hendrerit a. Sed vel augue aliquet, finibus lacus in, feugiat enim. Phasellus a justo tincidunt risus iaculis laoreet.

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


