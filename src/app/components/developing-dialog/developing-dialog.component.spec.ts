import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopingDialogComponent } from './developing-dialog.component';

describe('DevelopingDialogComponent', () => {
  let component: DevelopingDialogComponent;
  let fixture: ComponentFixture<DevelopingDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevelopingDialogComponent]
    });
    fixture = TestBed.createComponent(DevelopingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
