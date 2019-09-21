import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, tap, switchMap, filter, debounceTime } from 'rxjs/operators';

const URL= `https://swapi.co/api/people/?search=`

/*
Objectives:
1. must never mutate any data
2. should make a new search for every new user value
3. should wait before you have two letters
4. should wait the user stop enter new values for half second before
5. should retry the request 5 times if it throws any error
6. one old request should never override a new one
*/

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myInput = new FormControl;
  results$ = this.myInput.valueChanges.pipe(
    debounceTime(500),
    filter(text => text.length>2),
    switchMap((text) => {
      return this.http.get(`${URL}${text}`).pipe(
        switchMap((data: any) => {
          console.log(data);
          return of(data.results);
        })
      ) 
    }),
    
  );

  constructor(private http: HttpClient) {}
}