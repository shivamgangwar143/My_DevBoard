import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDashComponent } from './member-dash.component';

describe('MemberDashComponent', () => {
  let component: MemberDashComponent;
  let fixture: ComponentFixture<MemberDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
