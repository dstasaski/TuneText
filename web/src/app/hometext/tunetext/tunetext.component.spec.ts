import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { TunetextComponent } from './tunetext.component';
import { FormsModule } from '@angular/forms';

describe('TunetextComponent', () => {
  let component: TunetextComponent;
  let fixture: ComponentFixture<TunetextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TunetextComponent ],
      imports: [
        HttpClientModule, 
        FormsModule,
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TunetextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
