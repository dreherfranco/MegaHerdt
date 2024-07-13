import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddReparationArticlesComponent } from './dialog-add-reparation-articles.component';

describe('DialogAddReparationArticlesComponent', () => {
  let component: DialogAddReparationArticlesComponent;
  let fixture: ComponentFixture<DialogAddReparationArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddReparationArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddReparationArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
