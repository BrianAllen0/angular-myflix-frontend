import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFocusComponent } from './movie-focus.component';

describe('MovieFocusComponent', () => {
  let component: MovieFocusComponent;
  let fixture: ComponentFixture<MovieFocusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieFocusComponent]
    });
    fixture = TestBed.createComponent(MovieFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
