import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReparationClaimsComponent } from './client-reparation-claims.component';

describe('ClientReparationClaimsComponent', () => {
  let component: ClientReparationClaimsComponent;
  let fixture: ComponentFixture<ClientReparationClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientReparationClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientReparationClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
