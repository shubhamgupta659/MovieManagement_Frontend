import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDataviewComponent } from './movie-dataview.component';

describe('MovieDataviewComponent', () => {
  let component: MovieDataviewComponent;
  let fixture: ComponentFixture<MovieDataviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDataviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDataviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
