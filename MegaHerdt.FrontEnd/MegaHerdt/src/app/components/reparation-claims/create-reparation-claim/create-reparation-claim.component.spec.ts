import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReparationClaimComponent } from './create-reparation-claim.component';

describe('CreateReparationClaimComponent', () => {
  let component: CreateReparationClaimComponent;
  let fixture: ComponentFixture<CreateReparationClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReparationClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReparationClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
