import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOffcanvaComponent } from './cart-offcanva.component';

describe('CartOffcanvaComponent', () => {
  let component: CartOffcanvaComponent;
  let fixture: ComponentFixture<CartOffcanvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartOffcanvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartOffcanvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
