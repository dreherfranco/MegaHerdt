import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredStateDialogComponent } from './delivered-state-dialog.component';

describe('DeliveredStateDialogComponent', () => {
  let component: DeliveredStateDialogComponent;
  let fixture: ComponentFixture<DeliveredStateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveredStateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveredStateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
