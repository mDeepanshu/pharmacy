import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaPurchaseComponent } from './pharma-purchase.component';

describe('PharmaPurchaseComponent', () => {
  let component: PharmaPurchaseComponent;
  let fixture: ComponentFixture<PharmaPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmaPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
