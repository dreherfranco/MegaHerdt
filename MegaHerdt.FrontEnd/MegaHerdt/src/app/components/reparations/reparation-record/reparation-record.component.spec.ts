import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationRecordComponent } from './reparation-record.component';

describe('ReparationRecordComponent', () => {
  let component: ReparationRecordComponent;
  let fixture: ComponentFixture<ReparationRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparationRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
