import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TunetextComponent } from './tunetext.component';

describe('TunetextComponent', () => {
  let component: TunetextComponent;
  let fixture: ComponentFixture<TunetextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TunetextComponent ]
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
