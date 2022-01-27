import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReparationComponent } from './create-reparation.component';

describe('CreateReparationComponent', () => {
  let component: CreateReparationComponent;
  let fixture: ComponentFixture<CreateReparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReparationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
