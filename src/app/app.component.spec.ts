import {
  TestBed,
  fakeAsync,
  tick,
  ComponentFixture,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  Subject,
  debounceTime,
} from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  }));

  it('debounceTime should be affected by tick inside fakeAsync', fakeAsync(() => {
    const subject$: Subject<void> = new Subject<void>();
    let str = '';
    subject$.pipe(
      debounceTime(0),
    ).subscribe(() => str = 'test');
    subject$.next();
    expect(str).toEqual('');
    tick(1e3);
    expect(str).toEqual('test');
  }));

  it('debounceTime should be affected by tick outside fakeAsync', fakeAsync(() => {
    const divEl = fixture.debugElement.query(By.css('div'));
    fixture.componentInstance.btnClick();
    tick(1e4);
    expect(divEl.nativeElement.innerText).toEqual('clicked');
  }));
});
