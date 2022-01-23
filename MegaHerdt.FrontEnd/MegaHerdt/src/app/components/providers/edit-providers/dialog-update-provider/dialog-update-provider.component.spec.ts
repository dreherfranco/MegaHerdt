import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateProviderComponent } from './dialog-update-provider.component';

describe('DialogUpdateProviderComponent', () => {
  let component: DialogUpdateProviderComponent;
  let fixture: ComponentFixture<DialogUpdateProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
