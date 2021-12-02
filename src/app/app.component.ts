import { Component } from '@angular/core';
import {
  Subject,
  debounceTime,
  BehaviorSubject,
  map,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'debounceTimeTest';
  subject$ = new BehaviorSubject<boolean>(false);
  text$ = this.subject$.pipe(
    debounceTime(0),
    map(val => {
      return val ? 'not clicked' : 'clicked'
    }),
  );
  constructor() {
  }
  btnClick() {
    this.subject$.next(true);
  }
}
