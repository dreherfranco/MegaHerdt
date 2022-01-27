import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateReparationComponent } from './dialog-update-reparation.component';

describe('DialogUpdateReparationComponent', () => {
  let component: DialogUpdateReparationComponent;
  let fixture: ComponentFixture<DialogUpdateReparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateReparationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
