import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaAddPartyComponent } from './pharma-add-party.component';

describe('PharmaAddPartyComponent', () => {
  let component: PharmaAddPartyComponent;
  let fixture: ComponentFixture<PharmaAddPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmaAddPartyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaAddPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
