import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationStateENREVISIONComponent } from './reparation-state-en-revision.component';

describe('ReparationStateENREVISIONComponent', () => {
  let component: ReparationStateENREVISIONComponent;
  let fixture: ComponentFixture<ReparationStateENREVISIONComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparationStateENREVISIONComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationStateENREVISIONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
