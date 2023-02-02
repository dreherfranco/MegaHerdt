import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReparationStatePagadoComponent } from './update-reparation-state-pagado.component';

describe('UpdateReparationStatePagadoComponent', () => {
  let component: UpdateReparationStatePagadoComponent;
  let fixture: ComponentFixture<UpdateReparationStatePagadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReparationStatePagadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReparationStatePagadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
