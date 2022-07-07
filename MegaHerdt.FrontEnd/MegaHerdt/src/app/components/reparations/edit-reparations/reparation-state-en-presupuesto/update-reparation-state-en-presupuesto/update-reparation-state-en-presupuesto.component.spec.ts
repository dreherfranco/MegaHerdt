import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReparationStateENPRESUPUESTOComponent } from './update-reparation-state-en-presupuesto.component';

describe('UpdateReparationStateENPRESUPUESTOComponent', () => {
  let component: UpdateReparationStateENPRESUPUESTOComponent;
  let fixture: ComponentFixture<UpdateReparationStateENPRESUPUESTOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReparationStateENPRESUPUESTOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReparationStateENPRESUPUESTOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
