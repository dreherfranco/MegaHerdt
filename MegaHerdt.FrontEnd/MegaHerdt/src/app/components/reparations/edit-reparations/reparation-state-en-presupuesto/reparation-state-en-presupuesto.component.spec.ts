import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationStateENPRESUPUESTOComponent } from './reparation-state-en-presupuesto.component';

describe('ReparationStateENPRESUPUESTOComponent', () => {
  let component: ReparationStateENPRESUPUESTOComponent;
  let fixture: ComponentFixture<ReparationStateENPRESUPUESTOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparationStateENPRESUPUESTOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationStateENPRESUPUESTOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
