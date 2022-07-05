import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationStatePAGADOComponent } from './reparation-state-pagado.component';

describe('ReparationStatePAGADOComponent', () => {
  let component: ReparationStatePAGADOComponent;
  let fixture: ComponentFixture<ReparationStatePAGADOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparationStatePAGADOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationStatePAGADOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
