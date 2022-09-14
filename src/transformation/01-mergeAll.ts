import { debounceTime, fromEvent, map, mergeAll, Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { GithubUser } from "../interfaces/github-user.interface";
import { GithubCollectionResponse } from "../interfaces/github-users.interfaces";

// Helpers
const displayUsers = ( users: GithubUser[] ) => {
    orderList.innerHTML = '';
    users.forEach( user =>{

        // create HTML elements
        const li        = document.createElement('li');
        const img       = document.createElement('img');
        const anchor    = document.createElement('a');

        // set data
        img.src         = user.avatar_url;
        anchor.href     = user.html_url;
        anchor.text     = 'View Page';
        anchor.target   = '_blank';
        
        // appends
        li.append( img );
        li.append( user.login + ' ' );
        li.append( anchor );

        orderList.append( li );
    });
};

// References
const body = document.querySelector("body");
const textInput = document.createElement("input");
const orderList = document.createElement("ol");

body.append(textInput, orderList);

// Streams
const input$ = fromEvent<KeyboardEvent>(textInput, "keyup");

input$
  .pipe(
    debounceTime(500),

    map<KeyboardEvent, Observable<GithubCollectionResponse>>((event) =>
      ajax.getJSON(
        `https://api.github.com/search/users?q=${event.target["value"]}`
      )
    ),

    mergeAll<Observable<GithubCollectionResponse>>(),

    // type: <what recieved , what emitted>
    map<any, GithubUser[]>((response) => response["items"])
  )
  .subscribe( displayUsers );
