import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSettingsComponent } from './staff-settings.component';

describe('StaffSettingsComponent', () => {
  let component: StaffSettingsComponent;
  let fixture: ComponentFixture<StaffSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffSettingsComponent]
    });
    fixture = TestBed.createComponent(StaffSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
