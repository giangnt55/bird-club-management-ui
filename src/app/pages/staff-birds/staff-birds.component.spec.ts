import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffBirdsComponent } from './staff-birds.component';

describe('StaffBirdsComponent', () => {
  let component: StaffBirdsComponent;
  let fixture: ComponentFixture<StaffBirdsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffBirdsComponent]
    });
    fixture = TestBed.createComponent(StaffBirdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
