import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChangeInfoFormComponent } from './user-change-info-form.component';

describe('UserChangeInfoFormComponent', () => {
  let component: UserChangeInfoFormComponent;
  let fixture: ComponentFixture<UserChangeInfoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserChangeInfoFormComponent]
    });
    fixture = TestBed.createComponent(UserChangeInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
