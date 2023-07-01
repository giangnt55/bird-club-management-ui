import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionUserComponent } from './suggestion-user.component';

describe('SuggestionUserComponent', () => {
  let component: SuggestionUserComponent;
  let fixture: ComponentFixture<SuggestionUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestionUserComponent]
    });
    fixture = TestBed.createComponent(SuggestionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
