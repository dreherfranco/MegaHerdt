import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeSearchComponent } from './date-range-search.component';

describe('DateRangeSearchComponent', () => {
  let component: DateRangeSearchComponent;
  let fixture: ComponentFixture<DateRangeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateRangeSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
