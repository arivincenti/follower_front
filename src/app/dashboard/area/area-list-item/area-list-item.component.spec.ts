import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaListItemComponent } from './area-list-item.component';

describe('AreaListItemComponent', () => {
  let component: AreaListItemComponent;
  let fixture: ComponentFixture<AreaListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
