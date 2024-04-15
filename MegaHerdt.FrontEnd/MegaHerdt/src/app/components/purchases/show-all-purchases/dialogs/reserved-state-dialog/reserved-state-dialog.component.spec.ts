import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedStateDialogComponent } from './reserved-state-dialog.component';

describe('ReservedStateDialogComponent', () => {
  let component: ReservedStateDialogComponent;
  let fixture: ComponentFixture<ReservedStateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservedStateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservedStateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
