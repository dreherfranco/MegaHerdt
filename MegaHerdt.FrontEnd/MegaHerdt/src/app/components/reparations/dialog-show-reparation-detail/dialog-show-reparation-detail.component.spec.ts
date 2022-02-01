import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowReparationDetailComponent } from './dialog-show-reparation-detail.component';

describe('DialogShowReparationDetailComponent', () => {
  let component: DialogShowReparationDetailComponent;
  let fixture: ComponentFixture<DialogShowReparationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogShowReparationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShowReparationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
