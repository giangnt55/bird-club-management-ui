import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffUsersComponent } from './staff-users.component';

describe('StaffUsersComponent', () => {
  let component: StaffUsersComponent;
  let fixture: ComponentFixture<StaffUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffUsersComponent]
    });
    fixture = TestBed.createComponent(StaffUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
