import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateOfferComponent } from './dialog-update-offer.component';

describe('DialogUpdateOfferComponent', () => {
  let component: DialogUpdateOfferComponent;
  let fixture: ComponentFixture<DialogUpdateOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
