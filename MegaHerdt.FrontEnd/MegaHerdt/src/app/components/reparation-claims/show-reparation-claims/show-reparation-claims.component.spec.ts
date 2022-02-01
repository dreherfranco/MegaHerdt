import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReparationClaimsComponent } from './show-reparation-claims.component';

describe('ShowReparationClaimsComponent', () => {
  let component: ShowReparationClaimsComponent;
  let fixture: ComponentFixture<ShowReparationClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowReparationClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowReparationClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
