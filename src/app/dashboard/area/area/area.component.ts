import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit
{

  animation$: Observable<string[]>;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit()
  {
    this.animation$ = this.store.select(state => state.ui.animated);
  }

}
