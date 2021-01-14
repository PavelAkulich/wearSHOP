import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverPageComponent } from './deliver-page.component';

describe('DeliverPageComponent', () => {
  let component: DeliverPageComponent;
  let fixture: ComponentFixture<DeliverPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
