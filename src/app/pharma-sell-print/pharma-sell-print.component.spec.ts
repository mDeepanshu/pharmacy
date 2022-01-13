import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaSellPrintComponent } from './pharma-sell-print.component';

describe('PharmaSellPrintComponent', () => {
  let component: PharmaSellPrintComponent;
  let fixture: ComponentFixture<PharmaSellPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmaSellPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaSellPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
