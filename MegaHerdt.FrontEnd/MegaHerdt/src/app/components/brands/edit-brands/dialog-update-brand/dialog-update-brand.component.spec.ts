import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateBrandComponent } from './dialog-update-brand.component';

describe('DialogUpdateBrandComponent', () => {
  let component: DialogUpdateBrandComponent;
  let fixture: ComponentFixture<DialogUpdateBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
