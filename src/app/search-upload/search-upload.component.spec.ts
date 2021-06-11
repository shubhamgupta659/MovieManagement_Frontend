import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUploadComponent } from './search-upload.component';

describe('SearchUploadComponent', () => {
  let component: SearchUploadComponent;
  let fixture: ComponentFixture<SearchUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
