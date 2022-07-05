import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationStateINGRESOComponent } from './reparation-state-ingreso.component';

describe('ReparationStateINGRESOComponent', () => {
  let component: ReparationStateINGRESOComponent;
  let fixture: ComponentFixture<ReparationStateINGRESOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparationStateINGRESOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationStateINGRESOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
