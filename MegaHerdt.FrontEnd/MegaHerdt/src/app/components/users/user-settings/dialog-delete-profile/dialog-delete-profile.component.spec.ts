import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteProfileComponent } from './dialog-delete-profile.component';

describe('DialogDeleteProfileComponent', () => {
  let component: DialogDeleteProfileComponent;
  let fixture: ComponentFixture<DialogDeleteProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
