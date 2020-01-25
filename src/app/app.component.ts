import { Component, OnDestroy } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy
{
  title = 'front';
  themeSubscription: Subscription = new Subscription();
  theme$: Observable<string>;

  constructor(
    overlayContainer: OverlayContainer,
    private store: Store<AppState>
  )
  {

    this.theme$ = this.store.select(state => state.ui.theme);

    this.themeSubscription = this.theme$.subscribe(theme => overlayContainer.getContainerElement().classList.add(theme));
    // overlayContainer.getContainerElement().classList.add('dark-pink');
  }

  ngOnDestroy(): void
  {
    this.themeSubscription.unsubscribe();
  }
}
