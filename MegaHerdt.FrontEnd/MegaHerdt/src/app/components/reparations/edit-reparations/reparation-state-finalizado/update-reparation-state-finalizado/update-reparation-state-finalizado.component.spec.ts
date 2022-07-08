import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReparationStateFINALIZADOComponent } from './update-reparation-state-finalizado.component';

describe('UpdateReparationStateFINALIZADOComponent', () => {
  let component: UpdateReparationStateFINALIZADOComponent;
  let fixture: ComponentFixture<UpdateReparationStateFINALIZADOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReparationStateFINALIZADOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReparationStateFINALIZADOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
