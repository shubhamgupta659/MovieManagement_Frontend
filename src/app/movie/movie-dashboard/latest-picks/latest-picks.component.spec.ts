import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestPicksComponent } from './latest-picks.component';

describe('LatestPicksComponent', () => {
  let component: LatestPicksComponent;
  let fixture: ComponentFixture<LatestPicksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestPicksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestPicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
