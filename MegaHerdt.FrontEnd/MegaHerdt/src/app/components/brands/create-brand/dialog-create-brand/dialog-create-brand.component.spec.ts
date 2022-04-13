import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateBrandComponent } from './dialog-create-brand.component';

describe('DialogCreateBrandComponent', () => {
  let component: DialogCreateBrandComponent;
  let fixture: ComponentFixture<DialogCreateBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
