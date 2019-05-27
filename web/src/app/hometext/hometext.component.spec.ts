import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HometextComponent } from './hometext.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TunetextComponent } from './tunetext/tunetext.component';

describe('HometextComponent', () => {
  let component: HometextComponent;
  let fixture: ComponentFixture<HometextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ 
        HometextComponent,
        WelcomeComponent,
        TunetextComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HometextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
