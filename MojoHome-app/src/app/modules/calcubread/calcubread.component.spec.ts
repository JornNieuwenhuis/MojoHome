import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcubreadComponent } from './calcubread.component';

describe('CalcubreadComponent', () => {
  let component: CalcubreadComponent;
  let fixture: ComponentFixture<CalcubreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcubreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcubreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
