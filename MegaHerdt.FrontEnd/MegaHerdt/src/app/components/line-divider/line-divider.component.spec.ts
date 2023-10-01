import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineDividerComponent } from './line-divider.component';

describe('LineDividerComponent', () => {
  let component: LineDividerComponent;
  let fixture: ComponentFixture<LineDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineDividerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
