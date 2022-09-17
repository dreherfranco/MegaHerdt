import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDownloadBackupComponent } from './dialog-download-backup.component';

describe('DialogDownloadBackupComponent', () => {
  let component: DialogDownloadBackupComponent;
  let fixture: ComponentFixture<DialogDownloadBackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDownloadBackupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDownloadBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
