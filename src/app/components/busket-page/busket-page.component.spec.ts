import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusketPageComponent } from './busket-page.component';

describe('BusketPageComponent', () => {
  let component: BusketPageComponent;
  let fixture: ComponentFixture<BusketPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusketPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusketPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
