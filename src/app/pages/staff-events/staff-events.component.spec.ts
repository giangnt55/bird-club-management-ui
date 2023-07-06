import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffEventsComponent } from './staff-events.component';

describe('StaffEventsComponent', () => {
  let component: StaffEventsComponent;
  let fixture: ComponentFixture<StaffEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffEventsComponent]
    });
    fixture = TestBed.createComponent(StaffEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
