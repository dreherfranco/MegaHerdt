import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandGraphicComponent } from './brand-graphic.component';

describe('BrandGraphicComponent', () => {
  let component: BrandGraphicComponent;
  let fixture: ComponentFixture<BrandGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandGraphicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
