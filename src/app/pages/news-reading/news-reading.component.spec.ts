import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsReadingComponent } from './news-reading.component';

describe('NewsReadingComponent', () => {
  let component: NewsReadingComponent;
  let fixture: ComponentFixture<NewsReadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsReadingComponent]
    });
    fixture = TestBed.createComponent(NewsReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
