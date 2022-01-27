import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReparationsComponent } from './edit-reparations.component';

describe('EditReparationsComponent', () => {
  let component: EditReparationsComponent;
  let fixture: ComponentFixture<EditReparationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReparationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReparationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
