import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MainNavComponent } from './shared/main-nav/main-nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, MainNavComponent, FooterComponent],
      imports: [RouterTestingModule, RouterModule, NgbModule]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'QUT Compass'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('QUT Compass');
  }));
});
