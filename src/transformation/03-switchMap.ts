import { fromEvent, map, mergeMap, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { GithubUser } from "./interfaces/github-user.interface";

// Helpers
const displayUsers = (users: GithubUser[]) => {
  orderList.innerHTML = "";
  users.forEach((user) => {
    // create HTML elements
    const li = document.createElement("li");
    const img = document.createElement("img");
    const anchor = document.createElement("a");

    // set data
    img.src = user.avatar_url;
    anchor.href = user.html_url;
    anchor.text = "View Page";
    anchor.target = "_blank";

    // appends
    li.append(img);
    li.append(user.login + " ");
    li.append(anchor);

    orderList.append(li);
  });
};

// References
const body = document.querySelector("body");
const textInput = document.createElement("input");
const orderList = document.createElement("ol");

body.append(textInput, orderList);

// Streams
const input$ = fromEvent<KeyboardEvent>(textInput, "keyup");

const url: string = `https://api.github.com/search/users?q=`;
input$.pipe(
  map((query) => query.target["value"]),
  mergeMap((inputValue) => ajax.getJSON(url + inputValue)) // An action for every subscription to the input observable = To much requests!
);
// .subscribe( console.log )

const url2: string = 'https://httpbin.org/delay/1?arg=';
// If We use 'switchMap' We'va only the last subscription to the input observable. In thiscase we use the last value to make a request.
input$
  .pipe(
    map((query) => query.target["value"]),
    switchMap((inputValue) => ajax.getJSON(url2 + inputValue)) // An action for every subscription to the input observable = To much requests!
  )
  .subscribe(console.log);
