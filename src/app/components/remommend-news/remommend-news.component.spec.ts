import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemommendNewsComponent } from './remommend-news.component';

describe('RemommendNewsComponent', () => {
  let component: RemommendNewsComponent;
  let fixture: ComponentFixture<RemommendNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemommendNewsComponent]
    });
    fixture = TestBed.createComponent(RemommendNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
