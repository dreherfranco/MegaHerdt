import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInformesComponent } from './show-informes.component';

describe('ShowInformesComponent', () => {
  let component: ShowInformesComponent;
  let fixture: ComponentFixture<ShowInformesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowInformesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
