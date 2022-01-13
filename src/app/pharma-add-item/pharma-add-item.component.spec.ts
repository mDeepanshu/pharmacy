import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaAddItemComponent } from './pharma-add-item.component';

describe('PharmaAddItemComponent', () => {
  let component: PharmaAddItemComponent;
  let fixture: ComponentFixture<PharmaAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmaAddItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
