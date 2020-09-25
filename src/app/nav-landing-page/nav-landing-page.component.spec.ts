import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLandingPageComponent } from './nav-landing-page.component';

describe('NavLandingPageComponent', () => {
  let component: NavLandingPageComponent;
  let fixture: ComponentFixture<NavLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
