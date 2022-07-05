import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationStateCANCELADOComponent } from './reparation-state-cancelado.component';

describe('ReparationStateCANCELADOComponent', () => {
  let component: ReparationStateCANCELADOComponent;
  let fixture: ComponentFixture<ReparationStateCANCELADOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparationStateCANCELADOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationStateCANCELADOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
