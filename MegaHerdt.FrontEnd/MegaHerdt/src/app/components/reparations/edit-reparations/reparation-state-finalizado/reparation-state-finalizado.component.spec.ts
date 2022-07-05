import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationStateFINALIZADOComponent } from './reparation-state-finalizado.component';

describe('ReparationStateFINALIZADOComponent', () => {
  let component: ReparationStateFINALIZADOComponent;
  let fixture: ComponentFixture<ReparationStateFINALIZADOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparationStateFINALIZADOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationStateFINALIZADOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
