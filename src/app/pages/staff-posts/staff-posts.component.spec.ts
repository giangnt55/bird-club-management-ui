import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPostsComponent } from './staff-posts.component';

describe('StaffPostsComponent', () => {
  let component: StaffPostsComponent;
  let fixture: ComponentFixture<StaffPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffPostsComponent]
    });
    fixture = TestBed.createComponent(StaffPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
