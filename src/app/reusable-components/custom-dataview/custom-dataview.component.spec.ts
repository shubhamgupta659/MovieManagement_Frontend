import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDataviewComponent } from './custom-dataview.component';

describe('CustomDataviewComponent', () => {
  let component: CustomDataviewComponent;
  let fixture: ComponentFixture<CustomDataviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDataviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDataviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
