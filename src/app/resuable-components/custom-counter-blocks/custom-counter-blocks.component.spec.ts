import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCounterBlocksComponent } from './custom-counter-blocks.component';

describe('CustomCounterBlocksComponent', () => {
  let component: CustomCounterBlocksComponent;
  let fixture: ComponentFixture<CustomCounterBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCounterBlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCounterBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
