import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddProvisionItemComponent } from './dialog-add-provision-item.component';

describe('DialogAddProvisionItemComponent', () => {
  let component: DialogAddProvisionItemComponent;
  let fixture: ComponentFixture<DialogAddProvisionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddProvisionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddProvisionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
