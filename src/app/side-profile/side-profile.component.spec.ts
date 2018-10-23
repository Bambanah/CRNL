import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideProfileComponent } from './side-profile.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SideProfileComponent', () => {
  let component: SideProfileComponent;
  let fixture: ComponentFixture<SideProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideProfileComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
